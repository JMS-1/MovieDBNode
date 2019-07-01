declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { IGenre } from 'movie-db-api'

    interface IGenreState extends IEditState<IGenre> {}

    const enum genreActions {
        cancel = 'movie-db.genres.cancel-edit',
        load = 'movie-db.genres.load',
        save = 'movie-db.genres.save',
        saveDone = 'movie-db.genres.save-done',
        select = 'movie-db.genres.select',
        setProp = 'movie-db.genres.set-prop',
    }

    interface ILoadGenres extends IGenericLoad<IGenre> {
        type: genreActions.load
    }

    interface ISetGenreProperty<TProp extends keyof IGenre> extends ISetGenericProperty<IGenre, TProp> {
        type: genreActions.setProp
    }

    interface ISelectGenre extends IGenericSelect {
        type: genreActions.select
    }

    interface IGenreSaved extends IGenericSaveDone<IGenre> {
        type: genreActions.saveDone
    }

    interface ICancelGenreEdit extends IGenericCancelEdit {
        type: genreActions.cancel
    }

    interface ISaveGenre extends Action {
        type: genreActions.save
    }
}
