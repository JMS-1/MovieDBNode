import { ILanguageState, ILoadLanguages, languageActions } from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

type IAction = ILoadLanguages

export function LanguageReducer(state: ILanguageState, action: IAction): ILanguageState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case languageActions.load:
            return controller.load(state, action)
    }

    return state
}
