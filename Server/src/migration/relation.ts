import { uniqueId, validate } from '@jms-1/isxs-validation'

export interface IRelation {
    from: string
    to: string
}

export const RelationSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/relation.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        from: {
            message: 'Quellkennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        to: {
            message: 'Zielkennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
    },
    required: ['from', 'to'],
}

export class RelationCollection {
    readonly migrated: IRelation[] = []

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

        this.migrated.push(relation)
    }

    migrate(): Promise<void> {
        return Promise.resolve<void>(undefined)
    }
}
