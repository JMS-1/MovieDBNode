import * as debug from 'debug'
import { FilterQuery } from 'mongodb'

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
    languages: api.IQueryCountInfo[]
    genres: api.IQueryCountInfo[]
    view: api.IRecordingInfo[]
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

        const query: any[] = [
            { $match: filter },
            {
                $graphLookup: {
                    as: 'hierarchy',
                    connectFromField: 'parentId',
                    connectToField: '_id',
                    from: 'series',
                    startWith: '$series',
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
                            input: { $reverseArray: '$hierarchy' },
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

        query.push({
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
        })

        databaseTrace('query recordings: %j', query)

        const me = await this.getCollection()
        const result = await me.aggregate<IAggregationResult>(query).toArray()

        const firstRes = result && result[0]
        const countRes = firstRes && firstRes.count && firstRes.count[0]

        return {
            count: (countRes && countRes.total) || 0,
            genres: (firstRes && firstRes.genres) || [],
            languages: (firstRes && firstRes.languages) || [],
            total: await me.countDocuments(),
            view: (firstRes && firstRes.view) || [],
        }
    }
})()
