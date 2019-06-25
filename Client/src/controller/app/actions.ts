import { ISchemaResponse } from 'movie-db-api'
import { applicationActions, ILoadSchemas } from 'movie-db-client'

export class ApplicationActions {
    static loadSchemas(schemas: ISchemaResponse): ILoadSchemas {
        return { schemas, type: applicationActions.loadSchema }
    }
}
