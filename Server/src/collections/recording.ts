
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'

import { Recording } from '../model/entities'

export const RecordingCollection = MongoConnection.createCollection(
    Recording,
    class extends Collection<typeof Recording> {
        readonly collectionName = 'recordings'
    },
)
