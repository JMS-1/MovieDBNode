import { ISchema, uniqueId, validate } from '@jms-1/isxs-validation'
import { v4 as uuid } from 'uuid'

import { IDbLink } from '../database/recording'
import { MovieDbCollection } from '../database/utils'

export interface IMigrateLink extends IDbLink {
    _id: string
    for: string
    ordinal: number
}

const MigrateLinkSchema: ISchema<IMigrateLink> = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/link.json',
    additionalProperties: false,
    type: 'object',
    message: { de: 'Verweis unvollständig' },
    properties: {
        _id: {
            message: { de: 'Eindeutige Kennung fehlt oder ist ungültig' },
            pattern: uniqueId,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: { de: 'Beschreibung ist zu lang' },
            type: 'string',
        },
        for: {
            message: { de: 'Aufzeichnungskennung fehlt oder ist ungültig' },
            pattern: uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: { de: 'Name nicht angegeben oder zu lang' },
            minLength: 1,
            type: 'string',
        },
        ordinal: {
            message: { de: 'Anordnung fehlt oder ist ungültig' },
            minimum: 0,
            type: 'integer',
        },
        url: {
            maxLength: 2000,
            message: { de: 'Verweis ist zu lang' },
            type: 'string',
        },
    },
    required: ['_id', 'name', 'for', 'url', 'ordinal'],
}

export const linkCollection = new (class extends MovieDbCollection<IMigrateLink> {
    readonly name = 'n/a'

    readonly schema = MigrateLinkSchema

    fromSql(sql: any): void {
        const link: IMigrateLink = {
            _id: uuid(),
            for: sql.For,
            name: sql.Name || '',
            ordinal: parseInt(sql.Ordinal, 10),
            url: sql.Url,
        }

        if (sql.Description) {
            link.description = sql.Description
        }

        const errors = validate(link, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(link)
    }

    migrate(): Promise<void> {
        return Promise.resolve<void>(undefined)
    }
})()
