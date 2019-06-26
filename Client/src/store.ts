import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history'
import { Action, applyMiddleware, combineReducers, createStore, Store } from 'redux'

import { IClientState } from 'movie-db-client'

import * as controller from './controller'

export const history = createHashHistory({ hashType: 'hashbang' })

let store: Store<IClientState>

export function initializeStore(): Store<IClientState> {
    store = createStore(
        combineReducers<IClientState>({
            application: controller.ApplicationReducer,
            container: controller.ContainerReducer,
            genre: controller.GenreReducer,
            language: controller.LanguageReducer,
            media: controller.MediaReducer,
            mui: controller.MuiReducer,
            router: connectRouter(history),
            series: controller.SeriesReducer,
        }),
        applyMiddleware(routerMiddleware(history)),
    )

    return store
}

export class ServerApi {
    private static process(webMethod: string, method: string, data: any, process: (data: any) => Action): void {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            if (xhr.status === 200) {
                store.dispatch(process(xhr.response))
            } else {
                console.log('[tbd]')
            }
        }

        xhr.open('GET', `api/${webMethod}`)

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        }

        xhr.responseType = 'json'

        xhr.send(data)
    }

    static get(method: string, process: (data: any) => Action): void {
        ServerApi.process(method, 'GET', undefined, process)
    }

    static put(method: string, data: any, process: (data: any) => Action): void {
        ServerApi.process(method, 'PUT', data, process)
    }
}
