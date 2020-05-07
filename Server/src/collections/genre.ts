import { collectionNames } from './collections'
import { MongoConnection } from './connection'
import { ForeignKeyCollection } from './foreignKey'

import { Genre } from '../model/entities'

export const GenreCollection = MongoConnection.createCollection(
    Genre,
    class extends ForeignKeyCollection<typeof Genre> {
        readonly collectionName = collectionNames.genres
        readonly entityName = 'Kategorie'
        readonly parentProp = 'genres'
    }
)
