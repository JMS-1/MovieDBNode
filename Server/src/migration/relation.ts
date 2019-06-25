import { uniqueId } from '../database/entities/utils'
import { validate } from '../database/validation'

const enum RelationFields {
    from = 'from',
    to = 'to',
}

export interface IRelation {
    [RelationFields.from]: string
    [RelationFields.to]: string
}

export const RelationSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/relation.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        [RelationFields.from]: {
            message: 'Quellkennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [RelationFields.to]: {
            message: 'Zielkennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
    },
    required: [RelationFields.from, RelationFields.to],
}

export class RelationCollection {
    private readonly _migrated: IRelation[] = []

    constructor(private readonly _other: string) {}

    fromSql(sql: any): void {
        const relation: IRelation = {
            from: sql.Recording,
            to: sql[this._other],
        }

        const errors = validate(relation, RelationSchema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this._migrated.push(relation)
    }
}
