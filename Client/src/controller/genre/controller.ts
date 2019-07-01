import { IGenre } from 'movie-db-api'
import * as local from 'movie-db-client'

import { GenreActions } from './actions'

import { EditController } from '../controller'

import { ServerApi } from '../../store'

type TGenreActions =
    | local.ICancelGenreEdit
    | local.IGenreSaved
    | local.ILoadGenres
    | local.ILoadSchemas
    | local.ISaveGenre
    | local.ISelectGenre
    | local.ISetGenreProperty<any>

const controller = new (class extends EditController<IGenre, TGenreActions, local.IGenreState> {
    protected readonly schema = 'genre'

    protected readonly afterCancel = local.routes.genre

    protected readonly afterSave = local.routes.genre

    protected getReducerMap(): local.IActionHandlerMap<TGenreActions, local.IGenreState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.genreActions.cancel]: this.cancelEdit,
            [local.genreActions.load]: this.load,
            [local.genreActions.save]: this.startSave,
            [local.genreActions.saveDone]: this.saveDone,
            [local.genreActions.select]: this.select,
            [local.genreActions.setProp]: this.setProperty,
        }
    }

    protected createEmpty(): IGenre {
        return {
            _id: '',
            name: '',
        }
    }

    private startSave(state: local.IGenreState, request: local.ISaveGenre): local.IGenreState {
        if (state.workingCopy) {
            if (state.workingCopy._id) {
                ServerApi.put(`genre/${state.workingCopy._id}`, state.workingCopy, GenreActions.saveDone)
            } else {
                ServerApi.post('genre', state.workingCopy, GenreActions.saveDone)
            }
        }

        return state
    }
})()

export const GenreReducer = controller.reducer
