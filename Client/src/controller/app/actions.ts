import * as local from 'movie-db-client'

export class ApplicationActions {
    static beginWebRequest(): local.IStartWebRequest {
        return { type: local.applicationActions.startReq }
    }

    static endWebRequest(error: string): local.IDoneWebRequest {
        return { error, type: local.applicationActions.endReq }
    }

    static clearErrors(): local.IClearWebRequestErrors {
        return { type: local.applicationActions.resetErrors }
    }

    static setTheme(theme: string): local.ISetTheme {
        return { theme, type: local.applicationActions.setTheme }
    }
}
