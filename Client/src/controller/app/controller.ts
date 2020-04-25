import * as local from 'movie-db-client'
import { v4 as uuid } from 'uuid'

import { addSchema } from '../../validation'
import { Controller } from '../controller'

type TApplicationActions =
    | local.IClearWebRequestErrors
    | local.IDoneWebRequest
    | local.ILoadSchemas
    | local.ISetTheme
    | local.IStartWebRequest

const controller = new (class extends Controller<TApplicationActions, local.IApplicationState> {
    protected getReducerMap(): local.IActionHandlerMap<TApplicationActions, local.IApplicationState> {
        return {
            [local.applicationActions.endReq]: this.endWebRequest,
            [local.applicationActions.loadSchema]: this.loadSchemas,
            [local.applicationActions.resetErrors]: this.clearErrors,
            [local.applicationActions.setTheme]: this.setTheme,
            [local.applicationActions.startReq]: this.beginWebRequest,
        }
    }

    protected getInitialState(): local.IApplicationState {
        return {
            busySince: 0,
            errors: [],
            requests: 0,
            schemas: undefined,
            theme: undefined,
            themeId: uuid(),
        }
    }

    private loadSchemas(state: local.IApplicationState, response: local.ILoadSchemas): local.IApplicationState {
        const schemas = response.schemas

        for (const schema in schemas) {
            if (schemas.hasOwnProperty(schema)) {
                addSchema(schemas[<keyof typeof schemas>schema])
            }
        }

        return { ...state, schemas }
    }

    private clearErrors(
        state: local.IApplicationState,
        request: local.IClearWebRequestErrors
    ): local.IApplicationState {
        if (state.errors.length < 1) {
            return state
        }

        return { ...state, errors: [] }
    }

    private beginWebRequest(state: local.IApplicationState, request: local.IStartWebRequest): local.IApplicationState {
        return { ...state, busySince: state.requests ? state.busySince : Date.now(), requests: state.requests + 1 }
    }

    private endWebRequest(state: local.IApplicationState, request: local.IDoneWebRequest): local.IApplicationState {
        if (request.error) {
            state = { ...state, errors: [...state.errors, request.error] }
        }

        return { ...state, requests: state.requests - 1 }
    }

    /*
    private deleteDone(
        state: local.IApplicationState,
        response:
            | local.IContainerDeleted
            | local.IGenreDeleted
            | local.ILanguageDeleted
            | local.IRecordingDeleted
            | local.ISeriesDeleted
    ): local.IApplicationState {
        if (!response.errors || response.errors.length < 1) {
            return state
        }

        return { ...state, errors: [...state.errors, ...response.errors.map((e) => e.message)] }
    }
    */

    private setTheme(state: local.IApplicationState, request: local.ISetTheme): local.IApplicationState {
        if (state.theme === request.theme) {
            return state
        }

        let link = <HTMLLinkElement>document.getElementById(state.themeId)

        if (!link) {
            link = document.querySelector('head').appendChild(document.createElement('link'))

            link.id = state.themeId
            link.rel = 'stylesheet'
        }

        link.href = `${request.theme}/semantic.min.css`

        return { ...state, theme: request.theme }
    }
})()

export const ApplicationReducer = controller.reducer
