import { applicationActions, IApplicationState, ILoadSchemas } from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

type IAction = ILoadSchemas

export function ApplicationReducer(state: IApplicationState, action: IAction): IApplicationState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case applicationActions.load:
            return controller.loadSchemas(state, action)
    }

    return state
}
