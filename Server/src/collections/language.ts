
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'

import { Language } from '../model/entities'

export const LanguageCollection = MongoConnection.createCollection(
    Language,
    class extends Collection<typeof Language> {
        readonly collectionName = 'languages'
    },
)
