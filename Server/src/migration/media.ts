import { mediaType } from 'movie-db-api'

import { ISchema, uniqueId } from '../database/entities/utils'
import { CollectionBase } from '../database/utils'
import { validate } from '../database/validation'

export interface IMigrateMedia {
    _id: string
    containerId?: string
    position?: string
    type: mediaType
}

const MigrateMediaSchema: ISchema<IMigrateMedia> = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/media.json',
    additionalProperties: false,
    type: 'object',
    message: 'Medium unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        containerId: {
            message: 'Ablage ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        position: {
            maxLength: 100,
            message: 'Standort zu lang',
            type: 'string',
        },
        type: {
            message: 'Medienart fehlt oder ist unzulässig',
            type: 'integer',
            enum: [
                mediaType.BluRay,
                mediaType.DVD,
                mediaType.RecordedDVD,
                mediaType.SuperVideoCD,
                mediaType.Undefined,
                mediaType.VideoCD,
            ],
        },
    },
    required: ['_id', 'type'],
}

export const mediaCollection = new (class extends CollectionBase<IMigrateMedia> {
    readonly name = 'n/a'

    readonly schema = MigrateMediaSchema

    fromSql(sql: any): void {
        const media: IMigrateMedia = {
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

    migrate(): Promise<void> {
        return Promise.resolve<void>(undefined)
    }
})()
