declare module 'movie-db-client' {
    import { Action } from 'redux'

    interface IApplicationState {
        readonly busySince: number
        readonly errors: string[]
        readonly requests: number
        readonly theme: string
        readonly themeId: string
    }

    const enum applicationActions {
        endReq = 'movie-db.application.end-request',
        loadSchema = 'movie-db.application.load-schemas',
        resetErrors = 'movie-db.application.clear-errors',
        setTheme = 'movie-db.application.set-theme',
        startReq = 'movie-db.application.begin-request',
    }

    interface IStartWebRequest extends Action {
        type: applicationActions.startReq
    }

    interface IDoneWebRequest extends Action {
        error: string
        type: applicationActions.endReq
    }

    interface IClearWebRequestErrors extends Action {
        type: applicationActions.resetErrors
    }

    interface ISetTheme extends Action {
        theme: string
        type: applicationActions.setTheme
    }
}
