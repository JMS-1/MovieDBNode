import { v4 as uuid } from 'uuid'

import * as local from 'movie-db-client'

import { Controller } from '../controller'

import { addSchema } from '../../validation'

type TApplicationActions =
    | local.IClearWebRequestErrors
    | local.IContainerDeleted
    | local.IDoneWebRequest
    | local.IGenreDeleted
    | local.ILanguageDeleted
    | local.ILoadSchemas
    | local.IRecordingDeleted
    | local.ISeriesDeleted
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
            [local.containerActions.deleted]: this.containerDeleted,
            [local.genreActions.deleted]: this.genreDeleted,
            [local.languageActions.deleted]: this.languageDeleted,
            [local.recordingActions.deleted]: this.recordingDeleted,
            [local.seriesActions.deleted]: this.seriesDeleted,
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

        for (let schema in schemas) {
            if (schemas.hasOwnProperty(schema)) {
                addSchema(schemas[<keyof typeof schemas>schema])
            }
        }

        return { ...state, schemas }
    }

    private clearErrors(
        state: local.IApplicationState,
        request: local.IClearWebRequestErrors,
    ): local.IApplicationState {
        if (state.errors.length < 1) {
            return state
        }

        return { ...state, errors: [] }
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

    private deleteDone(
        state: local.IApplicationState,
        response:
            | local.IContainerDeleted
            | local.IGenreDeleted
            | local.ILanguageDeleted
            | local.IRecordingDeleted
            | local.ISeriesDeleted,
    ): local.IApplicationState {
        if (!response.errors || response.errors.length < 1) {
            return state
        }

        return { ...state, errors: [...state.errors, ...response.errors.map(e => e.message)] }
    }

    private genreDeleted(state: local.IApplicationState, response: local.IGenreDeleted): local.IApplicationState {
        return this.deleteDone(state, response)
    }

    private containerDeleted(
        state: local.IApplicationState,
        response: local.IContainerDeleted,
    ): local.IApplicationState {
        return this.deleteDone(state, response)
    }

    private languageDeleted(state: local.IApplicationState, response: local.ILanguageDeleted): local.IApplicationState {
        return this.deleteDone(state, response)
    }

    private recordingDeleted(
        state: local.IApplicationState,
        response: local.IRecordingDeleted,
    ): local.IApplicationState {
        return this.deleteDone(state, response)
    }

    private seriesDeleted(state: local.IApplicationState, response: local.ISeriesDeleted): local.IApplicationState {
        return this.deleteDone(state, response)
    }

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
