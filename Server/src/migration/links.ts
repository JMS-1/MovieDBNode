import { v4 as uuid } from 'uuid'

import { uniqueId } from '../database/entities/utils'
import { CollectionBase } from '../database/utils'
import { validate } from '../database/validation'

const enum LinkFields {
    _id = '_id',
    description = 'description',
    for = 'for',
    name = 'name',
    ordinal = 'ordinal',
    url = 'url',
}

export interface ILink {
    [LinkFields._id]: string
    [LinkFields.description]?: string
    [LinkFields.for]: string
    [LinkFields.name]: string
    [LinkFields.ordinal]: number
    [LinkFields.url]: string
}

export const LinkSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/link.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        [LinkFields._id]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [LinkFields.description]: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        [LinkFields.for]: {
            message: 'Aufzeichnungskennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [LinkFields.name]: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        [LinkFields.ordinal]: {
            message: 'Anordnung fehlt oder ist ungültig',
            minimum: 0,
            type: 'integer',
        },
        [LinkFields.url]: {
            maxLength: 2000,
            message: 'Verweis ist zu lang',
            type: 'string',
        },
    },
    required: [LinkFields._id, LinkFields.name, LinkFields.for, LinkFields.url, LinkFields.ordinal],
}

export const linkCollection = new (class extends CollectionBase<ILink> {
    readonly name = 'n/a'

    readonly schema = LinkSchema

    fromSql(sql: any): void {
        const link: ILink = {
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
})()
