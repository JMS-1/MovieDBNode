import { genreActions, IGenreState, ILoadGenres } from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

type IAction = ILoadGenres

export function GenreReducer(state: IGenreState, action: IAction): IGenreState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case genreActions.load:
            return controller.load(state, action)
    }

    return state
}
