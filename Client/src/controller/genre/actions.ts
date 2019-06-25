import { IGenre } from 'movie-db-api'
import { genreActions, ILoadGenres } from 'movie-db-client'

export class GenreActions {
    static load(genres: IGenre[]): ILoadGenres {
        return { genres, type: genreActions.load }
    }
}
