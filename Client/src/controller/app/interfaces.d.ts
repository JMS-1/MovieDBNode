declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { ISchemaResponse } from 'movie-db-api'

    interface IApplicationState {
        readonly schemas: ISchemaResponse
    }

    const enum applicationActions {
        loadSchema = 'movie-db.application.load-schemas',
    }

    interface ILoadSchemas extends Action {
        schemas: ISchemaResponse
        type: applicationActions.loadSchema
    }
}
