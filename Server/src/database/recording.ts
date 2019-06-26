import { FilterQuery } from 'mongodb'

import { IQueryCountInfo, IRecordingQueryRequest, IRecordingQueryResponse } from 'movie-db-api'

import { collectionName, IDbRecording, RecordingSchema } from './entities/recording'
import { CollectionBase } from './utils'
import { validate } from './validation'

export * from './entities/recording'

const dateReg = /^CAST\(N'([^\.]+)(\.\d+)?' AS DateTime\)$/

interface IAggregateCount {
    total: number
}

interface IAggregationResult {
    count: IAggregateCount[]
    languages: IQueryCountInfo[]
    genres: IQueryCountInfo[]
    view: IDbRecording[]
}

const escapeReg = /[.*+?^${}()|[\]\\]/g

export const recordingCollection = new (class extends CollectionBase<IDbRecording> {
    readonly name = collectionName

    readonly schema = RecordingSchema

    fromSql(sql: any): void {
        const date = dateReg.exec(sql.Created)

        const recording: IDbRecording = {
            _id: sql.Id,
            created: (date && `${date[1]}Z`) || sql.Created,
            genres: [],
            languages: [],
            links: [],
            media: sql.Media,
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
    }

    async query(req: IRecordingQueryRequest): Promise<IRecordingQueryResponse> {
        const filter: FilterQuery<IDbRecording> = { $or: [] }

        if (req.name) {
            filter.$or.push({ name: { $regex: req.name.toString().replace(escapeReg, '\\$&'), $options: 'i' } })
        }

        if (req.nameSeries && req.nameSeries.length > 0) {
            filter.$or.push({ series: { $in: req.nameSeries.map(s => s.toString()) } })
        }

        if (filter.$or.length < 1) {
            delete filter.$or
        }

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
                $facet: {
                    count: [{ $count: 'total' }],
                    languages: [{ $unwind: '$languages' }, { $group: { _id: '$languages', count: { $sum: 1 } } }],
                    genres: [{ $unwind: '$genres' }, { $group: { _id: '$genres', count: { $sum: 1 } } }],
                    view: [
                        { $sort: { [req.sort.toString()]: req.sortOrder === 'ascending' ? +1 : -1 } },
                        { $skip: 1 * req.firstPage * req.pageSize },
                        { $limit: 1 * req.pageSize },
                    ],
                },
            },
        ]

        const db = await this.getCollection()
        const result = await db.aggregate<IAggregationResult>(query).toArray()

        const firstRes = result && result[0]
        const countRes = firstRes && firstRes.count && firstRes.count[0]

        return {
            genres: (firstRes && firstRes.genres) || [],
            languages: (firstRes && firstRes.languages) || [],
            total: (countRes && countRes.total) || 0,
            view: (firstRes && firstRes.view) || [],
        }
    }
})()
