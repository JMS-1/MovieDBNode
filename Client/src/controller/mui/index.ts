import { Action } from 'redux'

import { IMuiState } from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

export function MuiReducer(state: IMuiState, action: Action): IMuiState {
    if (!state) {
        state = controller.getInitialState()
    }

    return state
}
