
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'

import { Genre } from '../model/entities'

export const GenreCollection = MongoConnection.createCollection(
    Genre,
    class extends Collection<typeof Genre> {
        readonly collectionName = 'genres'
    },
)
