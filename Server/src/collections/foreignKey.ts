import { CollectionBase } from '@jms-1/mongodb-graphql/lib/collection'
import { GqlRecord, TGqlLayoutType, TGqlType } from '@jms-1/mongodb-graphql/lib/types'

import { collectionNames } from './collections'

import { IRecording } from '../model'

export interface IItem {
    _id: string
}

export abstract class ForeignKeyCollection<
    TModel extends GqlRecord<TItem, TLayout>,
    TItem = TGqlType<TModel>,
    TLayout = TGqlLayoutType<TModel>
> extends CollectionBase<TItem extends IItem ? TItem : never, TLayout> {
    abstract readonly entityName: string

    abstract readonly parentProp: keyof IRecording

    async initialize(): Promise<void> {
        const db = await this.connection.database

        await db.command({ collMod: this.collectionName, validator: {} })
    }

    async beforeRemove(_id: string): Promise<void> {
        const recordings = await this.connection.getCollection(collectionNames.recordings)
        const count = await recordings.countDocuments({ [this.parentProp]: _id })

        switch (count) {
            case 0:
                return
            case 1:
                throw new Error(`${this.entityName} wird noch für eine Aufzeichnung verwendet`)
            default:
                throw new Error(`${this.entityName} wird noch für ${count} Aufzeichnungen verwendet`)
        }
    }
}
