
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'

import { Series } from '../model/entities'

export const SeriesCollection = MongoConnection.createCollection(
    Series,
    class extends Collection<typeof Series> {
        readonly collectionName = 'series'
    },
)
