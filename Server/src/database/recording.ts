import { getMessage } from '@jms-1/isxs-tools'
import { IMuiString, IValidationError, validate } from '@jms-1/isxs-validation'
import debug from 'debug'
import { CollationDocument, Collection, FilterQuery } from 'mongodb'

import * as api from 'movie-db-api'

import { collectionName, IDbRecording, RecordingSchema } from './entities/recording'
import { databaseError, MovieDbCollection } from './utils'

export * from './entities/recording'

const databaseTrace = debug('database:trace')
const dateReg = /^CAST\(N'([^\.]+)(\.\d+)?' AS DateTime\)$/

interface IAggregateCount {
    total: number
}

interface IAggregationResult {
    count: IAggregateCount[]
    genres: api.IQueryCountInfo[]
    view: api.IRecording[]
}

interface IAggregateFullName {
    _id: string
    fullName: string
}

const escapeReg = /[.*+?^${}()|[\]\\]/g
const collation: CollationDocument = { locale: 'en', strength: 2 }

export const recordingCollection = new (class extends MovieDbCollection<IDbRecording> {
    readonly name = collectionName

    readonly schema = RecordingSchema

    readonly mediaMigration: { [id: string]: string } = {}

    async initialize(collection: Collection<IDbRecording>): Promise<void> {
        await collection.createIndex({ containerId: 1 }, { name: 'recording_container' })
        await collection.createIndex({ created: 1 }, { name: 'recording_date' })
        await collection.createIndex({ genres: 1 }, { name: 'recording_genres' })
        await collection.createIndex({ languages: 1 }, { name: 'recording_languages' })
        await collection.createIndex({ name: 1 }, { name: 'recording_name' })
        await collection.createIndex({ rentTo: 1 }, { name: 'recording_rent' })
        await collection.createIndex({ series: 1 }, { name: 'recording_series' })
    }

    fromSql(sql: any): void {
        const date = dateReg.exec(sql.Created)

        const recording: IDbRecording = {
            _id: sql.Id,
            containerType: api.mediaType.Undefined,
            created: (date && `${date[1]}Z`) || sql.Created,
            genres: [],
            languages: [],
            links: [],
            name: sql.Name,
        }

        if (sql.Description) {
            recording.description = sql.Description
        }

        if (sql.RentTo) {
            recording.rentTo = sql.RentTo
        }

        if (sql.Series) {
            recording.series = sql.Series
        }

        const errors = validate(recording, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(recording)
        this.mediaMigration[recording._id] = sql.Media
    }

    async query(req: api.IRecordingQueryRequest): Promise<api.IRecordingQueryResponse> {
        const filter: FilterQuery<IDbRecording> = {}

        if (req.language) {
            filter.languages = req.language.toString()
        }

        if (req.genres && req.genres.length > 0) {
            filter.genres = { $all: req.genres.map(s => s.toString()) }
        }

        if (req.series && req.series.length > 0) {
            filter.series = { $in: req.series.map(s => s.toString()) }
        }

        if (typeof req.rent === 'boolean') {
            filter.rentTo = { $exists: req.rent }
        }

        if (req.fullName) {
            filter.fullName = { $regex: req.fullName.toString().replace(escapeReg, '\\$&'), $options: 'i' }
        }

        const query = [{ $match: filter }]
        const baseQuery = [...query]

        // Für die eigentliche Ergebnisermittlung sind aller Filter aktiv.
        query.push(<any>{
            $facet: {
                count: [{ $count: 'total' }],
                genres: [{ $unwind: '$genres' }, { $group: { _id: '$genres', count: { $sum: 1 } } }],
                view: [
                    { $sort: { [req.sort.toString()]: req.sortOrder === 'ascending' ? +1 : -1 } },
                    { $skip: 1 * req.firstPage * req.pageSize },
                    { $limit: 1 * req.pageSize },
                ],
            },
        })

        databaseTrace('query recordings: %j', query)

        const me = await this.getCollection()
        const result = await me.aggregate<IAggregationResult>(query, { collation }).toArray()

        const firstRes = result && result[0]
        const countRes = firstRes && firstRes.count && firstRes.count[0]

        // Für die Bewertung der Sprachen muss der Sprachfilter deaktiviert werden.
        delete filter.languages

        const languageInfo = await me
            .aggregate<api.IQueryCountInfo>(
                [...baseQuery, { $unwind: '$languages' }, { $group: { _id: '$languages', count: { $sum: 1 } } }],
                { collation },
            )
            .toArray()

        return {
            correlationId: req.correlationId,
            count: (countRes && countRes.total) || 0,
            genres: (firstRes && firstRes.genres) || [],
            languages: languageInfo || [],
            total: await me.countDocuments(),
            list: (firstRes && firstRes.view) || [],
        }
    }

    async inUse<TProp extends keyof IDbRecording>(property: TProp, id: string, scope: string): Promise<IMuiString> {
        const me = await this.getCollection()
        const count = await me.countDocuments({ [property]: typeof id === 'string' && id })

        switch (count) {
            case 0:
                return undefined
            case 1:
                return { de: `${scope} wird noch für eine Aufzeichnung verwendet` }
            default:
                return { de: `${scope} wird noch für ${count} Aufzeichnungen verwendet` }
        }
    }

    async insertOne(recording: IDbRecording): Promise<IValidationError[]> {
        const errors = await super.insertOne(recording)

        if (!errors || errors.length < 1) {
            try {
                await this.refreshFullNames({ _id: recording._id })
            } catch (error) {
                databaseError('failed to refresh recording full name: %s', getMessage(error))
            }
        }

        return errors
    }

    async findOneAndReplace(recording: IDbRecording): Promise<IValidationError[]> {
        const existing = await this.findOne(recording._id)

        if (existing) {
            recording = { ...recording, created: existing.created }
        }

        const errors = await super.findOneAndReplace(recording)

        if (!errors || errors.length < 1) {
            try {
                await this.refreshFullNames({ _id: recording._id })
            } catch (error) {
                databaseError('failed to refresh recording full name: %s', getMessage(error))
            }
        }

        return errors
    }

    async refreshFullNames(filter: FilterQuery<IDbRecording>): Promise<void> {
        const me = await this.getCollection()

        const query = [
            { $match: filter },
            { $lookup: { as: 'series', foreignField: '_id', from: 'series', localField: 'series' } },
            { $project: { _id: 1, name: 1, series: { $ifNull: [{ $arrayElemAt: ['$series', 0] }, null] } } },
            {
                $project: {
                    _id: 1,
                    fullName: {
                        $cond: {
                            if: { $eq: ['$series', null] },
                            then: '$name',
                            else: { $concat: ['$series.fullName', ' > ', '$name'] },
                        },
                    },
                },
            },
        ]

        const results = await me.aggregate<IAggregateFullName>(query).toArray()

        for (let recording of results) {
            await me.findOneAndUpdate({ _id: recording._id }, { $set: { fullName: recording.fullName } })
        }
    }

    async queryContainer(id: string): Promise<api.IRecording[]> {
        const me = await this.getCollection()

        return me
            .find({ containerId: typeof id === 'string' && id }, { collation })
            .sort({ fullName: 1 })
            .toArray()
    }
})()
