import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class ApplicationActions {
    static loadSchemas(schemas: api.ISchemaResponse): local.ILoadSchemas {
        return { schemas, type: local.applicationActions.loadSchema }
    }

    static beginWebRequest(): local.IStartWebRequest {
        return { type: local.applicationActions.startReq }
    }

    static endWebRequest(error: string): local.IDoneWebRequest {
        return { error, type: local.applicationActions.endReq }
    }
}
