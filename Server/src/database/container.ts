import { collectionName, ContainerSchema } from './entities/container'

export * from './entities/container'

export const containerCollection = new (class {
    readonly name = collectionName

    readonly schema = ContainerSchema
})()
