import { TSortDirection } from '@jms-1/mongodb-graphql'
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'
import * as types from '@jms-1/mongodb-graphql/lib/types'
import { Filter, ObjectId } from 'mongodb'

import { collectionNames } from './collections'
import { MongoConnection } from './connection'
import { refreshRecordingNames } from './utils'

import { IGenre, ILanguage, IQueryCountInfo, IRecording, TRecordingSort } from '../model'
import { Recording, RecordingQueryResponse, RecordingSort } from '../model/entities'
import { uniqueIdPattern } from '../model/utils'

export let csvData = ''

export function escape(str: string): string {
    return `"${(str || '').replace(/"/g, '""')}"`
}

const escapeReg = /[.*+?^${}()|[\]\\]/g

const collation = { locale: 'en', strength: 2 }

interface IAggregateCount {
    total: number
}

interface IAggregationResult {
    count: IAggregateCount[]
    genres: IQueryCountInfo[]
    view: IRecording[]
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecordingCollection = MongoConnection.createCollection(
    Recording,
    class extends Collection<typeof Recording> {
        readonly collectionName = collectionNames.recordings

        async initialize(): Promise<void> {
            const db = await this.connection.database

            await db.command({ collMod: this.collectionName, validator: {} })

            const self = await this.collection

            await self.createIndex({ containerId: 1 }, { name: 'recording_container' })
            await self.createIndex({ created: 1 }, { name: 'recording_date' })
            await self.createIndex({ genres: 1 }, { name: 'recording_genres' })
            await self.createIndex({ languages: 1 }, { name: 'recording_languages' })
            await self.createIndex({ name: 1 }, { name: 'recording_name' })
            await self.createIndex({ rentTo: 1 }, { name: 'recording_rent' })
            await self.createIndex({ series: 1 }, { name: 'recording_series' })
        }

        async validateForeignKeys(collectionName: string, scope: string, ids?: string | string[]): Promise<void> {
            if (!ids) {
                return
            }

            if (!Array.isArray(ids)) {
                ids = [ids]
            }

            const test = Array.from(new Set(ids))
            const keys = await this.connection.getCollection(collectionName)
            const existing = await keys.countDocuments({ _id: { $in: test as unknown as ObjectId[] } })

            if (existing !== test.length) {
                throw new Error(`${scope} nicht gefunden.`)
            }
        }

        async demandForeignKeys(item: IRecording): Promise<void> {
            await this.validateForeignKeys(collectionNames.containers, 'Ablage', item.containerId)
            await this.validateForeignKeys(collectionNames.genres, 'Kategorie', item.genres)
            await this.validateForeignKeys(collectionNames.languages, 'Sprache', item.languages)
            await this.validateForeignKeys(collectionNames.series, 'Serie', item.series)
        }

        async setFullName(item: IRecording): Promise<void> {
            const names = await refreshRecordingNames({ _id: item._id }, await this.collection)

            if (names[0]?._id === item._id) {
                item.fullName = names[0].fullName
            }
        }

        beforeInsert(item: IRecording): Promise<void> {
            item.created = new Date().toISOString()

            return this.demandForeignKeys(item)
        }

        afterInsert(item: IRecording): Promise<void> {
            return this.setFullName(item)
        }

        beforeUpdate(item: IRecording): Promise<void> {
            return this.demandForeignKeys(item)
        }

        afterUpdate(item: IRecording): Promise<void> {
            return this.setFullName(item)
        }

        readonly findByContainer = this.queries.register(
            'findByContainer',
            {
                containerId: types.GqlId({
                    description: 'Die eindeutige Kennung der Ablage.',
                    validation: {
                        pattern: uniqueIdPattern,
                        type: 'string',
                    },
                }),
            },
            types.GqlArray(this.model),
            'Alle Aufzeichnungen in einer Ablage ermitteln.',
            async (args) => {
                const self = await this.collection
                const recordings = await self.find({ containerId: args.containerId }).sort({ fullName: 1 }).toArray()

                return Promise.all(recordings.map(async (r) => await this.toGraphQL(r)))
            }
        )

        readonly query = this.queries.register(
            'query',
            {
                correlationId: types.GqlNullable(types.GqlId({ description: 'Eindeutige Kennung für diesen Aufruf.' })),
                firstPage: types.GqlInt({
                    description: '0-basierte Nummer der Ergebnisseite.',
                    validation: { min: 0, type: 'number' },
                }),
                forExport: types.GqlNullable(
                    types.GqlBoolean({ description: 'Erlaubt den Abruf des Ergebnisses als CSV Inhalt.' })
                ),
                fullName: types.GqlNullable(
                    types.GqlString({
                        description: 'Optional ein Suchmuster für den vollständigen Namen einer Aufzeichnung.',
                    })
                ),
                genres: types.GqlNullable(
                    types.GqlArray(
                        types.GqlString({
                            validation: {
                                pattern: uniqueIdPattern,
                                type: 'string',
                            },
                        }),
                        { description: 'Optional eine Liste von Kategorien, die Aufzeichnungen alle haben müssen.' }
                    )
                ),
                language: types.GqlNullable(
                    types.GqlString({ description: 'Optional die Sprache die eine Aufzeichnung haben muss.' })
                ),
                pageSize: types.GqlInt({
                    description: 'Die Größe einer Ergebnisseite.',
                    validation: { min: 1, type: 'number' },
                }),
                rent: types.GqlNullable(
                    types.GqlBoolean({ description: 'Optional gesetzt um nur verliehene Aufzeichnungen zu erhalten.' })
                ),
                series: types.GqlNullable(
                    types.GqlArray(
                        types.GqlString({
                            validation: {
                                pattern: uniqueIdPattern,
                                type: 'string',
                            },
                        }),
                        { description: 'Optional eine Liste von Serien, von denen eine Aufzeichnung eine haben muss.' }
                    )
                ),
                sort: RecordingSort,
                sortOrder: types.SortDirection,
            },
            RecordingQueryResponse,
            'Freie Suche über Aufzeichnungen.',
            async (args) => {
                const filter: Filter<IRecording> = {}

                if (args.language) {
                    filter.languages = args.language
                }

                if (args.genres && args.genres.length > 0) {
                    filter.genres = { $all: args.genres }
                }

                if (args.series && args.series.length > 0) {
                    filter.series = { $in: args.series }
                }

                switch (args.rent) {
                    case true:
                        filter.rentTo = { $nin: ['', null as unknown as string] }
                        break
                    case false:
                        filter.rentTo = { $in: ['', null as unknown as string] }
                        break
                }

                if (args.fullName) {
                    filter.fullName = { $options: 'i', $regex: args.fullName.replace(escapeReg, '\\$&') }
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const query: any[] = [{ $match: filter }]
                const baseQuery = [...query]

                // Für die eigentliche Ergebnisermittlung sind alle Filter aktiv.
                query.push({
                    $facet: {
                        count: [{ $count: 'total' }],
                        genres: [{ $unwind: '$genres' }, { $group: { _id: '$genres', count: { $sum: 1 } } }],
                        view: [
                            {
                                $sort: {
                                    [args.sort === TRecordingSort.created ? 'created' : 'fullName']:
                                        args.sortOrder === TSortDirection.Ascending ? +1 : -1,
                                },
                            },
                            { $skip: args.firstPage * args.pageSize },
                            { $limit: args.pageSize },
                        ],
                    },
                })

                const self = await this.collection
                const result = await self.aggregate<IAggregationResult>(query, { collation }).toArray()

                const firstRes = result && result[0]
                const countRes = firstRes?.count?.[0]

                // Für die Bewertung der Sprachen muss der Sprachfilter deaktiviert werden.
                delete filter.languages

                const languageInfo = await self
                    .aggregate<IQueryCountInfo>(
                        [
                            ...baseQuery,
                            { $unwind: '$languages' },
                            { $group: { _id: '$languages', count: { $sum: 1 } } },
                        ],
                        { collation }
                    )
                    .toArray()

                const response = {
                    correlationId: args.correlationId,
                    count: countRes?.total || 0,
                    genres: firstRes?.genres || [],
                    languages: languageInfo || [],
                    total: await self.countDocuments(),
                    view: firstRes?.view || [],
                }

                if (!args.forExport) {
                    return response
                }

                const languageCollection = await this.connection.getCollection(collectionNames.languages)
                const languages = await languageCollection.find<ILanguage>({}).toArray()

                const languageMap: { [id: string]: string } = {}
                languages.forEach((l) => (languageMap[l._id] = l.name))

                const genreCollection = await this.connection.getCollection(collectionNames.genres)
                const genres = await genreCollection.find<IGenre>({}).toArray()

                const genreMap: { [id: string]: string } = {}
                genres.forEach((g) => (genreMap[g._id] = g.name))

                csvData = 'Name;Sprachen;Kategorien\r\n'

                for (const recording of response.view) {
                    const name = escape(recording.fullName)
                    const languages = escape((recording.languages || []).map((l) => languageMap[l] || l).join('; '))
                    const genres = escape((recording.genres || []).map((l) => genreMap[l] || l).join('; '))

                    csvData += `${name};${languages};${genres}\r\n`
                }

                return { correlationId: args.correlationId, count: 0, genres: [], languages: [], total: 0, view: [] }
            }
        )
    }
)
