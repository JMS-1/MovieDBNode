import * as local from 'movie-db-client'

import { Controller, IActionHandlerMap } from '../controller'

type TLanguageActions = local.ILoadLanguages

const controller = new (class extends Controller<TLanguageActions, local.ILanguageState> {
    protected getReducerMap(): IActionHandlerMap<TLanguageActions, local.ILanguageState> {
        return {
            [local.languageActions.load]: this.load,
        }
    }

    protected getInitialState(): local.ILanguageState {
        return {
            all: [],
        }
    }

    private load(state: local.ILanguageState, response: local.ILoadLanguages): local.ILanguageState {
        return { ...state, all: response.languages || [] }
    }
})()

export const LanguageReducer = controller.reducer
