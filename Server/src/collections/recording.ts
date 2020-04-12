import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { collectionNames } from './collections'
import { MongoConnection } from './connection'
import { refreshRecordingNames } from './utils'

import { IRecording } from '../model'
import { Recording } from '../model/entities'

export const RecordingCollection = MongoConnection.createCollection(
    Recording,
    class extends Collection<typeof Recording> {
        readonly collectionName = collectionNames.recordings

        async initialize(): Promise<void> {
            const self = await this.collection

            await self.createIndex({ containerId: 1 }, { name: 'recording_container' })
            await self.createIndex({ created: 1 }, { name: 'recording_date' })
            await self.createIndex({ genres: 1 }, { name: 'recording_genres' })
            await self.createIndex({ languages: 1 }, { name: 'recording_languages' })
            await self.createIndex({ name: 1 }, { name: 'recording_name' })
            await self.createIndex({ rentTo: 1 }, { name: 'recording_rent' })
            await self.createIndex({ series: 1 }, { name: 'recording_series' })
        }

        private async validateForeignKeys(
            collectionName: string,
            scope: string,
            ids?: string | string[]
        ): Promise<void> {
            if (!ids) {
                return
            }

            if (!Array.isArray(ids)) {
                ids = [ids]
            }

            const test = Array.from(new Set(ids))
            const keys = await this._connection.getCollection(collectionName)
            const existing = await keys.countDocuments({ _id: { $in: test } })

            if (existing !== test.length) {
                throw new Error(`${scope} nicht gefunden.`)
            }
        }

        private async demandForeignKeys(item: IRecording): Promise<void> {
            await this.validateForeignKeys(collectionNames.containers, 'Ablage', item.containerId)
            await this.validateForeignKeys(collectionNames.series, 'Serie', item.series)
            await this.validateForeignKeys(collectionNames.languages, 'Sprache', item.languages)
            await this.validateForeignKeys(collectionNames.genres, 'Kategorie', item.genres)
        }

        private async setFullName(item: IRecording): Promise<void> {
            const names = await refreshRecordingNames({ _id: item._id }, await this.collection)

            if (names[0]?._id === item._id) {
                item.fullName = names[0].fullName
            }
        }

        protected beforeInsert(item: IRecording): Promise<void> {
            item.created = new Date().toISOString()

            return this.demandForeignKeys(item)
        }

        protected afterInsert(item: IRecording): Promise<void> {
            return this.setFullName(item)
        }

        protected beforeUpdate(item: IRecording, id: string): Promise<void> {
            return this.demandForeignKeys(item)
        }

        protected afterUpdate(item: IRecording): Promise<void> {
            return this.setFullName(item)
        }
    }
)
