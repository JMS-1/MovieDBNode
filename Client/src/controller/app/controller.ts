import * as local from 'movie-db-client'

import { addSchema } from '../../validation'

export function getInitialState(): local.IApplicationState {
    return {
        errors: [],
        requests: 0,
        schemas: undefined,
    }
}

export function loadSchemas(state: local.IApplicationState, response: local.ILoadSchemas): local.IApplicationState {
    const schemas = response.schemas

    for (let schema in schemas) {
        if (schemas.hasOwnProperty(schema)) {
            addSchema(schemas[<keyof typeof schemas>schema])
        }
    }

    return { ...state, schemas }
}

export function beginWebRequest(
    state: local.IApplicationState,
    request: local.IStartWebRequest,
): local.IApplicationState {
    return { ...state, requests: state.requests + 1 }
}

export function endWebRequest(state: local.IApplicationState, request: local.IDoneWebRequest): local.IApplicationState {
    if (request.error) {
        state = { ...state, errors: [...state.errors, request.error] }
    }

    return { ...state, requests: state.requests - 1 }
}
