declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { ISchemaResponse } from 'movie-db-api'

    interface IApplicationState {
        readonly busySince: number
        readonly errors: string[]
        readonly requests: number
        readonly schemas: ISchemaResponse
    }

    const enum applicationActions {
        endReq = 'movie-db.application.end-request',
        loadSchema = 'movie-db.application.load-schemas',
        resetErrors = 'movie-db.application.clear-errors',
        startReq = 'movie-db.application.begin-request',
    }

    interface ILoadSchemas extends Action {
        schemas: ISchemaResponse
        type: applicationActions.loadSchema
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
}
