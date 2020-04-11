
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'
import { RecordingCollection } from './recording'

import { Language } from '../model/entities'

export const LanguageCollection = MongoConnection.createCollection(
    Language,
    class extends Collection<typeof Language> {
        readonly collectionName = 'languages'

        protected async beforeRemove(_id: string): Promise<void> {
            const me = await RecordingCollection.collection
            const count = await me.countDocuments({ languages: _id })

            switch (count) {
                case 0:
                    return
                case 1:
                    throw new Error('Sprache wird noch für eine Aufzeichnung verwendet')
                default:
                    throw new Error(`Sprache wird noch für ${count} Aufzeichnungen verwendet`)
            }
        }
    },
)
