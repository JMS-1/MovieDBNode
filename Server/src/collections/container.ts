import { collectionNames } from './collections'
import { MongoConnection } from './connection'
import { HierarchicalCollection } from './hierarchical'

import { Container } from '../model/entities'

export const ContainerCollection = MongoConnection.createCollection(
    Container,
    class extends HierarchicalCollection<typeof Container> {
        readonly collectionName = collectionNames.containers
        readonly entityName = 'Ablage'
        readonly parentProp = 'containerId'
    }
)
