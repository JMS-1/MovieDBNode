import * as local from 'movie-db-client'

import { Controller, IActionHandlerMap } from '../controller'

import { addSchema } from '../../validation'

type TApplicationActions = local.ILoadSchemas | local.IStartWebRequest | local.IDoneWebRequest

const controller = new (class extends Controller<TApplicationActions, local.IApplicationState> {
    protected getReducerMap(): IActionHandlerMap<TApplicationActions, local.IApplicationState> {
        return {
            [local.applicationActions.endReq]: this.endWebRequest,
            [local.applicationActions.loadSchema]: this.loadSchemas,
            [local.applicationActions.startReq]: this.beginWebRequest,
        }
    }

    protected getInitialState(): local.IApplicationState {
        return {
            busySince: 0,
            errors: [],
            requests: 0,
            schemas: undefined,
        }
    }

    private loadSchemas(state: local.IApplicationState, response: local.ILoadSchemas): local.IApplicationState {
        const schemas = response.schemas

        for (let schema in schemas) {
            if (schemas.hasOwnProperty(schema)) {
                addSchema(schemas[<keyof typeof schemas>schema])
            }
        }

        return { ...state, schemas }
    }

    private beginWebRequest(state: local.IApplicationState, request: local.IStartWebRequest): local.IApplicationState {
        return { ...state, requests: state.requests + 1, busySince: state.requests ? state.busySince : Date.now() }
    }

    private endWebRequest(state: local.IApplicationState, request: local.IDoneWebRequest): local.IApplicationState {
        if (request.error) {
            state = { ...state, errors: [...state.errors, request.error] }
        }

        return { ...state, requests: state.requests - 1 }
    }
})()

export const ApplicationReducer = controller.reducer
