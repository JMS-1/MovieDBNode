import { Collection } from '@jms-1/mongodb-graphql/lib/collection'

import { collectionNames } from './collections'
import { MongoConnection } from './connection'

import { IContainer } from '../model'
import { Container } from '../model/entities'

export const ContainerCollection = MongoConnection.createCollection(
    Container,
    class extends Collection<typeof Container> {
        readonly collectionName = collectionNames.containers

        private async demandParent(parentId: string): Promise<boolean> {
            if (!parentId) {
                return false
            }

            const self = await this.collection
            const parent = await self.findOne({ _id: parentId })

            if (!parent) {
                throw new Error('Übergeordnete Ablage unbekannt.')
            }

            return true
        }

        protected async beforeInsert(container: IContainer): Promise<void> {
            await this.demandParent(container.parentId)
        }

        protected async beforeUpdate(container: IContainer, id: string): Promise<void> {
            if (!(await this.demandParent(container.parentId))) {
                return
            }

            const self = await this.collection
            const all = await self.find({}, { projection: { _id: 1, parentId: 1 } }).toArray()

            const parentMap: Record<string, string> = {}

            all.forEach((c) => (parentMap[c._id] = c.parentId))

            parentMap[id] = container.parentId

            const cycleTest = new Set<string>()

            for (; id; id = parentMap[id]) {
                if (cycleTest.has(id)) {
                    throw new Error('Zyklische Definition von Ablagen nicht zulässig')
                }

                cycleTest.add(id)
            }
        }

        protected async beforeRemove(_id: string): Promise<void> {
            const recordings = await this._connection.getCollection(collectionNames.recordings)
            const count = await recordings.countDocuments({ containerId: _id })

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
    }
)
