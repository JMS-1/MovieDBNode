import { IGenreResponse } from 'movie-db-api'
import { genreActions, ILoadGenres } from 'movie-db-client'

export class GenreActions {
    static load(response: IGenreResponse): ILoadGenres {
        return { genres: response.list, type: genreActions.load }
    }
}
