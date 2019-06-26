import * as local from 'movie-db-client'

import { Controller } from '../controller'

type TGenreActions = local.ILoadGenres

const controller = new (class extends Controller<TGenreActions, local.IGenreState> {
    protected getReducerMap(): local.IActionHandlerMap<TGenreActions, local.IGenreState> {
        return {
            [local.genreActions.load]: this.load,
        }
    }

    protected getInitialState(): local.IGenreState {
        return {
            all: [],
        }
    }

    private load(state: local.IGenreState, response: local.ILoadGenres): local.IGenreState {
        return { ...state, all: response.genres || [] }
    }
})()

export const GenreReducer = controller.reducer
