import { ILanguageState, ILoadLanguages } from 'movie-db-client'

export function getInitialState(): ILanguageState {
    return {
        all: [],
    }
}

export function load(state: ILanguageState, response: ILoadLanguages): ILanguageState {
    return { ...state, all: response.languages || [] }
}
