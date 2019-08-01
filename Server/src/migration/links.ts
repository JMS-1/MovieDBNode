import { ISchema, uniqueId, validate } from '@jms-1/isxs-validation'
import { v4 as uuid } from 'uuid'

import { IDbLink } from '../database/recording'
import { CollectionBase } from '../database/utils'

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
    message: 'Verweis unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        for: {
            message: 'Aufzeichnungskennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        ordinal: {
            message: 'Anordnung fehlt oder ist ungültig',
            minimum: 0,
            type: 'integer',
        },
        url: {
            maxLength: 2000,
            message: 'Verweis ist zu lang',
            type: 'string',
        },
    },
    required: ['_id', 'name', 'for', 'url', 'ordinal'],
}

export const linkCollection = new (class extends CollectionBase<IMigrateLink> {
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
