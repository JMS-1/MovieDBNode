import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { collectionNames } from './collections'
import { MongoConnection } from './connection'

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
    }
)
