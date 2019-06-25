declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { IGenre } from 'movie-db-api'

    interface IGenreState {
        readonly all: IGenre[]
    }

    const enum genreActions {
        load = 'movie-db.genres.load',
    }

    interface ILoadGenres extends Action {
        genres: IGenre[]
        type: genreActions.load
    }
}
