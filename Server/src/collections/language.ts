import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { collectionNames } from './collections'
import { MongoConnection } from './connection'

import { Language } from '../model/entities'

export const LanguageCollection = MongoConnection.createCollection(
    Language,
    class extends Collection<typeof Language> {
        readonly collectionName = collectionNames.languages

        async beforeRemove(_id: string): Promise<void> {
            const recordings = await this.connection.getCollection(collectionNames.recordings)
            const count = await recordings.countDocuments({ languages: _id })

            switch (count) {
                case 0:
                    return
                case 1:
                    throw new Error('Sprache wird noch für eine Aufzeichnung verwendet')
                default:
                    throw new Error(`Sprache wird noch für ${count} Aufzeichnungen verwendet`)
            }
        }
    }
)
