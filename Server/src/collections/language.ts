import { collectionNames } from './collections'
import { MongoConnection } from './connection'
import { ForeignKeyCollection } from './foreignKey'

import { Language } from '../model/entities'

export const LanguageCollection = MongoConnection.createCollection(
    Language,
    class extends ForeignKeyCollection<typeof Language> {
        readonly collectionName = collectionNames.languages
        readonly entityName = 'Sprache'
        readonly parentProp = 'languages'
    }
)
