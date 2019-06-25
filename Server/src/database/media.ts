import { collectionName, IDbMedia, MediaSchema } from './entities/media'
import { CollectionBase } from './utils'
import { validate } from './validation'

export * from './entities/media'

export const mediaCollection = new (class extends CollectionBase<IDbMedia> {
    readonly name = collectionName

    readonly schema = MediaSchema

    fromSql(sql: any): void {
        const media: IDbMedia = {
            _id: sql.Id,
            type: parseInt(sql.Type, 10),
        }

        if (sql.Container) {
            media.containerId = sql.Container
        }

        if (sql.Position) {
            media.position = sql.Position
        }

        const errors = validate(media, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(media)
    }
})()
