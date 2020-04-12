
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'
import { RecordingCollection } from './recording'

import { Genre } from '../model/entities'

export const GenreCollection = MongoConnection.createCollection(
    Genre,
    class extends Collection<typeof Genre> {
        readonly collectionName = 'genres'

        protected async beforeRemove(_id: string): Promise<void> {
            const self = await RecordingCollection.collection
            const count = await self.countDocuments({ genres: _id })

            switch (count) {
                case 0:
                    return
                case 1:
                    throw new Error('Kategorie wird noch für eine Aufzeichnung verwendet')
                default:
                    throw new Error(`Kategorie wird noch für ${count} Aufzeichnungen verwendet`)
            }
        }
    },
)
