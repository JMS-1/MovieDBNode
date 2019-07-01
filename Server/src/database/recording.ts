import * as debug from 'debug'
import { CollationDocument, FilterQuery } from 'mongodb'

import * as api from 'movie-db-api'

import { collectionName, IDbRecording, RecordingSchema } from './entities/recording'
import { CollectionBase } from './utils'
import { validate } from './validation'

export * from './entities/recording'

const databaseTrace = debug('database:trace')
const dateReg = /^CAST\(N'([^\.]+)(\.\d+)?' AS DateTime\)$/

interface IAggregateCount {
    total: number
}

interface IAggregationResult {
    count: IAggregateCount[]
    genres: api.IQueryCountInfo[]
    view: api.IRecordingInfo[]
}

const escapeReg = /[.*+?^${}()|[\]\\]/g
const collation: CollationDocument = { locale: 'en', strength: 2 }

export const recordingCollection = new (class extends CollectionBase<IDbRecording> {
    readonly name = collectionName

    readonly schema = RecordingSchema

    readonly mediaMigration: { [id: string]: string } = {}

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

        const query = [
            { $match: filter },
            {
                $graphLookup: {
                    as: 'hierarchy',
                    connectFromField: 'parentId',
                    connectToField: '_id',
                    depthField: '_depth',
                    from: 'series',
                    startWith: '$series',
                },
            },
            { $unwind: { path: '$hierarchy', preserveNullAndEmptyArrays: true } },
            { $sort: { 'hierarchy._depth': 1 } },
            {
                $group: {
                    _id: '$_id',
                    created: { $first: '$created' },
                    description: { $first: '$description' },
                    genres: { $first: '$genres' },
                    languages: { $first: '$languages' },
                    links: { $first: '$links' },
                    media: { $first: '$media' },
                    name: { $first: '$name' },
                    rentTo: { $first: '$rentTo' },
                    series: { $first: '$series' },
                    sortedHierarchy: { $push: '$hierarchy' },
                },
            },
            {
                $project: {
                    _id: 1,
                    created: 1,
                    description: 1,
                    fullName: {
                        $reduce: {
                            in: { $concat: ['$$this.name', ' > ', '$$value'] },
                            initialValue: '$name',
                            input: '$sortedHierarchy',
                        },
                    },
                    genres: 1,
                    languages: 1,
                    links: 1,
                    media: 1,
                    name: 1,
                    rentTo: 1,
                    series: 1,
                },
            },
        ]

        if (req.fullName) {
            query.push({
                $match: { fullName: { $regex: req.fullName.toString().replace(escapeReg, '\\$&'), $options: 'i' } },
            })
        }

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
                { collation }
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

    async findOneAndReplace(recording: IDbRecording): Promise<api.IValidationError[]> {
        const existing = await this.findOne(recording._id)

        if (existing) {
            recording = { ...recording, created: existing.created }
        }

        return super.findOneAndReplace(recording)
    }

    async deleteOne(id: string): Promise<api.IValidationError[]> {
        return [{ constraint: 'database', property: '*', message: 'not yet implemented' }]
    }
})()
