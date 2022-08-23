import { GqlRecord, TGqlLayoutType, TGqlType } from '@jms-1/mongodb-graphql/lib/types'
import { Filter } from 'mongodb'

import { ForeignKeyCollection, IItem } from './foreignKey'

import { IRecording } from '../model'

interface IHierarchicalItem extends IItem {
    parentId?: string
}

export abstract class HierarchicalCollection<
    TModel extends GqlRecord<TItem, TLayout>,
    TItem = TGqlType<TModel>,
    TLayout = TGqlLayoutType<TModel>
> extends ForeignKeyCollection<TModel, TItem, TLayout> {
    abstract readonly entityName: string
    abstract readonly parentProp: keyof IRecording

    private async demandParent(parentId?: string): Promise<boolean> {
        if (!parentId) {
            return false
        }

        const self = await this.collection

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parent = await self.findOne({ _id: parentId } as Filter<unknown>)

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
        const all = await self.find<IHierarchicalItem>({}, { projection: { _id: 1, parentId: 1 } }).toArray()

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

    async afterRemove(item: TItem & IHierarchicalItem): Promise<void> {
        const self = await this.collection

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await self.updateMany({ parentId: item._id } as any, { $unset: { parentId: null } } as any)
    }
}
