import { collectionName, ContainerSchema, IDbContainer } from './entities/container'
import { CollectionBase } from './utils'

export * from './entities/container'

export const containerCollection = new (class extends CollectionBase<IDbContainer> {
    readonly name = collectionName

    readonly schema = ContainerSchema

    async migrate(sql: any): Promise<void> {
        const container: IDbContainer = {
            _id: sql.Id,
            name: sql.Name || '',
            type: parseInt(sql.Type, 10),
        }

        if (sql.Description) {
            container.description = sql.Description
        }

        if (sql.Parent) {
            container.parentId = sql.Parent
        }

        if (sql.ParentLocation) {
            container.parentLocation = sql.ParentLocation
        }

        const errors = await this.insert(container)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }
    }
})()
