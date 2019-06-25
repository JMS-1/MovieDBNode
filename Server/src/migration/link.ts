import { uniqueId } from '../database/entities/utils'
import { validate } from '../database/validation'

const enum LinkFields {
    from = 'from',
    to = 'to',
}

export interface ILink {
    [LinkFields.from]: string
    [LinkFields.to]: string
}

export const LinkSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/link.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        [LinkFields.from]: {
            message: 'Quellkennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [LinkFields.to]: {
            message: 'Zielkennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
    },
    required: [LinkFields.from, LinkFields.to],
}

export class LinkCollection {
    private readonly _migrated: ILink[] = []

    constructor(private readonly _other: string) {}

    fromSql(sql: any): void {
        const link: ILink = {
            from: sql.Recording,
            to: sql[this._other],
        }

        const errors = validate(link, LinkSchema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this._migrated.push(link)
    }
}
