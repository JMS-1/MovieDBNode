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
            mui: controller.MuiReducer,
            router: connectRouter(history),
            series: controller.SeriesReducer,
            recording: controller.RecordingReducer,
        }),
        applyMiddleware(routerMiddleware(history)),
    )

    return store
}

function getMessage(error: any): string {
    return typeof error === 'string' ? error : error.message || 'failed'
}

export function delayedDispatch(action: Action): void {
    setTimeout(() => store.dispatch(action), 0)
}

export class ServerApi {
    private static process(webMethod: string, method: string, data: any, process: (data: any) => Action): void {
        window.setTimeout(() => {
            store.dispatch(controller.ApplicationActions.beginWebRequest())

            try {
                const xhr = new XMLHttpRequest()

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        store.dispatch(controller.ApplicationActions.endWebRequest(undefined))
                        store.dispatch(process(xhr.response))
                    } else {
                        store.dispatch(
                            controller.ApplicationActions.endWebRequest({
                                en: `${webMethod}: ${xhr.statusText || `HTTP ${xhr.status}`}`,
                            }),
                        )
                    }
                }

                xhr.open(method, `api/${webMethod}`)

                if (data) {
                    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
                }

                xhr.responseType = 'json'

                xhr.send(data && JSON.stringify(data))
            } catch (error) {
                store.dispatch(
                    controller.ApplicationActions.endWebRequest({ en: `${webMethod}: ${getMessage(error)}` }),
                )
            }
        }, 0)
    }

    static get(method: string, process: (data: any) => Action): void {
        ServerApi.process(method, 'GET', undefined, process)
    }

    static delete(method: string, process: (data: any) => Action): void {
        ServerApi.process(method, 'DELETE', undefined, process)
    }

    static put(method: string, data: any, process: (data: any) => Action): void {
        ServerApi.process(method, 'PUT', data, process)
    }

    static post(method: string, data: any, process: (data: any) => Action): void {
        ServerApi.process(method, 'POST', data, process)
    }
}
