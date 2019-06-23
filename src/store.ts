import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { applyMiddleware, combineReducers, createStore, Store } from 'redux'

import { IClientState, MuiReducer } from './controller'

export const history = createHashHistory({ hashType: 'hashbang' })

export function initializeStore(): Store<IClientState> {
    return createStore(
        combineReducers<IClientState>({
            mui: MuiReducer,
            router: connectRouter(history),
        }),
        applyMiddleware(routerMiddleware(history)),
    )
}
