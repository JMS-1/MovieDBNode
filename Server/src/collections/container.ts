
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'

import { Container } from '../model/entities'

export const ContainerCollection = MongoConnection.createCollection(
    Container,
    class extends Collection<typeof Container> {
        readonly collectionName = 'containers'
    },
)
