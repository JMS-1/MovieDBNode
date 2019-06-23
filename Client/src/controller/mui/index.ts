import { Action } from 'redux'

import * as controller from './controller'
import { IMuiState } from './interfaces'

export * from './actions'
export * from './interfaces'

export function MuiReducer(state: IMuiState, action: Action): IMuiState {
    if (!state) {
        state = controller.getInitialState()
    }

    return state
}
