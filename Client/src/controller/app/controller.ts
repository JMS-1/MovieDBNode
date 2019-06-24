import { IApplicationState, ILoadSchemas } from 'movie-db-client'

import { addSchema } from '../../validation'

export function getInitialState(): IApplicationState {
    return {
        schemas: undefined,
    }
}

export function loadSchemas(state: IApplicationState, response: ILoadSchemas): IApplicationState {
    const schemas = response.schemas

    for (let schema in schemas) {
        if (schemas.hasOwnProperty(schema)) {
            addSchema(schemas[<keyof typeof schemas>schema])
        }
    }

    return { ...state, schemas }
}
