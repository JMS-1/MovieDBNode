import { ILanguageResponse } from 'movie-db-api'
import { ILoadLanguages, languageActions } from 'movie-db-client'

export class LanguageActions {
    static load(response: ILanguageResponse): ILoadLanguages {
        return { languages: response.languages, type: languageActions.load }
    }
}
