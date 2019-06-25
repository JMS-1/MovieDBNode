declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { ILanguage } from 'movie-db-api'

    interface ILanguageState {
        readonly all: ILanguage[]
    }

    const enum languageActions {
        load = 'movie-db.languages.load',
    }

    interface ILoadLanguages extends Action {
        languages: ILanguage[]
        type: languageActions.load
    }
}
