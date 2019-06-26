import * as local from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

type IAction = local.ILoadSchemas | local.IStartWebRequest | local.IDoneWebRequest

export function ApplicationReducer(state: local.IApplicationState, action: IAction): local.IApplicationState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case local.applicationActions.loadSchema:
            return controller.loadSchemas(state, action)
        case local.applicationActions.startReq:
            return controller.beginWebRequest(state, action)
        case local.applicationActions.endReq:
            return controller.endWebRequest(state, action)
    }

    return state
}
