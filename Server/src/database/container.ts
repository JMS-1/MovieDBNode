import { validate } from '@jms-1/isxs-validation'

import { collectionName, ContainerSchema, IDbContainer } from './entities/container'
import { recordingCollection } from './recording'
import { CollectionBase } from './utils'

export * from './entities/container'

export const containerCollection = new (class extends CollectionBase<IDbContainer> {
    readonly name = collectionName

    readonly schema = ContainerSchema

    fromSql(sql: any): void {
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

        const errors = validate(container, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(container)
    }

    protected async canDelete(id: string): Promise<string> {
        return recordingCollection.inUse('containerId', id, 'Ablage')
    }

    protected async postDelete(id: string): Promise<void> {
        const me = await this.getCollection()

        await me.updateMany({ parentId: typeof id === 'string' && id }, { $unset: { parentId: null } })
    }
})()
