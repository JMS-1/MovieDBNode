import { ILanguage } from 'movie-db-api'
import { ILoadLanguages, languageActions } from 'movie-db-client'

export class LanguageActions {
    static load(languages: ILanguage[]): ILoadLanguages {
        return { languages, type: languageActions.load }
    }
}
