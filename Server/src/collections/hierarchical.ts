import { CollectionBase } from '@jms-1/mongodb-graphql/lib/collection'
import { GqlRecord, TGqlLayoutType, TGqlType } from '@jms-1/mongodb-graphql/lib/types'

import { collectionNames } from './collections'

interface IHierarchicalItem {
    _id: string
    parentId?: string
}

export abstract class HierarchicalCollection<
    TModel extends GqlRecord<TItem, TLayout>,
    TItem = TGqlType<TModel>,
    TLayout = TGqlLayoutType<TModel>
> extends CollectionBase<TItem extends IHierarchicalItem ? TItem : never, TLayout> {
    abstract readonly entityName: string

    private async demandParent(parentId?: string): Promise<boolean> {
        if (!parentId) {
            return false
        }

        const self = await this.collection
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parent = await self.findOne({ _id: parentId } as any)

        if (!parent) {
            throw new Error(`Übergeordnete ${this.entityName} unbekannt.`)
        }

        return true
    }

    async beforeInsert(item: TItem & IHierarchicalItem): Promise<void> {
        await this.demandParent(item.parentId)
    }

    async beforeUpdate(item: TItem & IHierarchicalItem, id: string): Promise<void> {
        if (!(await this.demandParent(item.parentId))) {
            return
        }

        const self = await this.collection
        const all = await self.find({}, { projection: { _id: 1, parentId: 1 } }).toArray()

        const parentMap: Record<string, string> = {}

        all.forEach((c) => (parentMap[c._id] = c.parentId))

        parentMap[id] = item.parentId

        const cycleTest = new Set<string>()

        for (; id; id = parentMap[id]) {
            if (cycleTest.has(id)) {
                throw new Error('Zyklische Definition nicht zulässig')
            }

            cycleTest.add(id)
        }
    }

    async beforeRemove(_id: string): Promise<void> {
        const recordings = await this.connection.getCollection(collectionNames.recordings)
        const count = await recordings.countDocuments({ containerId: _id })

        switch (count) {
            case 0:
                return
            case 1:
                throw new Error(`${this.entityName} wird noch für eine Aufzeichnung verwendet`)
            default:
                throw new Error(`${this.entityName} wird noch für ${count} Aufzeichnungen verwendet`)
        }
    }

    async afterRemove(item: TItem & IHierarchicalItem): Promise<void> {
        const self = await this.collection

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await self.updateMany({ parentId: item._id } as any, { $unset: { parentId: null } } as any)
    }
}
