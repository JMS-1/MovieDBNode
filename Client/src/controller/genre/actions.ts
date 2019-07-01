import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class GenreActions {
    static load(response: api.IGenreResponse): local.ILoadGenres {
        return { list: response.list, type: local.genreActions.load }
    }

    static select(id: string): local.ISelectGenre {
        return { id, type: local.genreActions.select }
    }

    static setProperty<TProp extends keyof api.IGenre>(
        prop: TProp,
        value: api.IGenre[TProp],
    ): local.ISetGenreProperty<TProp> {
        return { prop, value, type: local.genreActions.setProp }
    }

    static saveDone(response: api.IUpdateGenreResponse): local.IGenreSaved {
        return { item: response.item, errors: response.errors, type: local.genreActions.saveDone }
    }

    static cancelEdit(): local.ICancelGenreEdit {
        return { type: local.genreActions.cancel }
    }

    static save(): local.ISaveGenre {
        return { type: local.genreActions.save }
    }
}
