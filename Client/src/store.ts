import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { Action, applyMiddleware, combineReducers, createStore, Store } from 'redux'

import { IClientState } from 'movie-db-client'

import { ApplicationReducer, ContainerReducer, MuiReducer } from './controller'

export const history = createHashHistory({ hashType: 'hashbang' })

let store: Store<IClientState>

export function initializeStore(): Store<IClientState> {
    store = createStore(
        combineReducers<IClientState>({
            application: ApplicationReducer,
            container: ContainerReducer,
            mui: MuiReducer,
            router: connectRouter(history),
        }),
        applyMiddleware(routerMiddleware(history)),
    )

    return store
}

export class ServerApi {
    static get(method: string, process: (data: any) => Action): void {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            if (xhr.status === 200) {
                store.dispatch(process(xhr.response))
            } else {
                console.log('[tbd]')
            }
        }

        xhr.responseType = 'json'
        xhr.open('GET', `api/${method}`)
        xhr.send()
    }
}
