import * as djv from 'djv'

import { IValidatableSchema, IValidationError, IValidationScope } from 'movie-db-api'

const propReg = /^\[decodeURIComponent\(['"]([^'"]+)['"]\)\]$/

const validation = new djv()

export function addSchema<TSchema extends IValidatableSchema>(schema: TSchema): void {
    function errorHandler(errorType: string): string {
        let scope: IValidationScope = schema

        const props = []

        for (let prop of this.data.slice(1)) {
            const match = propReg.exec(prop)
            const found = match && match[1]

            if (found) {
                props.push(found)

                scope = (scope.properties || {})[found] || {}
            }
        }

        return `{ errors.push({ constraint: "${errorType}", property: "${props.join('.') ||
            '*'}", message: "${scope.message || ''}" }); }`
    }

    validation.setErrorHandler(errorHandler)
    validation.addSchema(schema.$id, schema)

    validation.setErrorHandler(undefined)
}

export function validate<TSchema extends IValidatableSchema>(object: any, schema: TSchema): IValidationError[] {
    try {
        return <any>validation.validate(schema.$id, object)
    } catch (error) {
        return [
            {
                contraint: 'vaidator',
                message: typeof error === 'string' ? error : error.message || 'failed',
                property: '*',
            },
        ]
    }
}
