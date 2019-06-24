import * as djv from 'djv'

const propReg = /^\[decodeURIComponent\(['"]([^'"]+)['"]\)\]$/

const validation = new djv()

export interface IValidationError {
    readonly contraint: string
    readonly property: string
    readonly message: string
}

interface IScope {
    message: string
    properties?: any
}

interface ISchema extends IScope {
    $id: string
}

export function addSchema<TSchema extends ISchema>(schema: TSchema): void {
    function errorHandler(errorType: string): string {
        let scope: any = schema

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

export function validate<TSchema extends ISchema>(object: any, schema: TSchema): IValidationError[] {
    return <any>validation.validate(schema.$id, object)
}
