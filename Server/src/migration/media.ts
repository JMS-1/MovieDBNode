import { ISchema, uniqueId, validate } from '@jms-1/isxs-validation'

import { mediaType } from 'movie-db-api'

export interface IMigrateMedia {
    _id: string
    containerId?: string
    position?: string
    type: mediaType
}

export const MigrateMediaSchema: ISchema<IMigrateMedia> = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/media.json',
    additionalProperties: false,
    type: 'object',
    message: { de: 'Medium unvollständig' },
    properties: {
        _id: {
            message: { de: 'Eindeutige Kennung fehlt oder ist ungültig' },
            pattern: uniqueId,
            type: 'string',
        },
        containerId: {
            message: { de: 'Ablage ist ungültig' },
            pattern: uniqueId,
            type: 'string',
        },
        position: {
            maxLength: 100,
            message: { de: 'Standort zu lang' },
            type: 'string',
        },
        type: {
            message: { de: 'Medienart fehlt oder ist unzulässig' },
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

export const mediaCollection = new (class {
    readonly migrationMap: { [id: string]: IMigrateMedia }

    protected cacheMigrated(item: IMigrateMedia): void {
        if (this.migrationMap[item._id]) {
            throw new Error(`duplicated identifier '${item._id}`)
        }

        this.migrationMap[item._id] = item
    }

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

        const errors = validate(media, MigrateMediaSchema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(media)
    }

    migrate(): Promise<void> {
        return Promise.resolve<void>(undefined)
    }
})()
