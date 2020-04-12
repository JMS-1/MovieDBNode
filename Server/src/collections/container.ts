
import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { MongoConnection } from './connection'
import { RecordingCollection } from './recording'

import { IContainer } from '../model'
import { Container } from '../model/entities'

export const ContainerCollection = MongoConnection.createCollection(
    Container,
    class extends Collection<typeof Container> {
        readonly collectionName = 'containers'

        protected async beforeRemove(_id: string): Promise<void> {
            const self = await RecordingCollection.collection
            const count = await self.countDocuments({ containerId: _id })

            switch (count) {
                case 0:
                    return
                case 1:
                    throw new Error('Ablage wird noch für eine Aufzeichnung verwendet')
                default:
                    throw new Error(`Ablage wird noch für ${count} Aufzeichnungen verwendet`)
            }
        }

        protected async afterRemove(container: IContainer): Promise<void> {
            const self = await this.collection

            await self.updateMany({ parentId: container._id }, { $unset: { parentId: null } })
        }
    },
)
