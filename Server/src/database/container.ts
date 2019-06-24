import { collectionName, ContainerSchema, IDbContainer } from './entities/container'
import { CollectionBase } from './utils'

export * from './entities/container'

export const containerCollection = new (class extends CollectionBase<IDbContainer> {
    readonly name = collectionName

    readonly schema = ContainerSchema
})()
