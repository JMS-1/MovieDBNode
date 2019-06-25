import { IGenreState, ILoadGenres } from 'movie-db-client'

export function getInitialState(): IGenreState {
    return {
        all: [],
    }
}

export function load(state: IGenreState, response: ILoadGenres): IGenreState {
    return { ...state, all: response.genres || [] }
}
