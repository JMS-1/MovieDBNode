import { ILoadMedia, IMediaState, mediaActions } from 'movie-db-client'

import { Controller, IActionHandlerMap } from '../controller'

type TMediaActions = ILoadMedia

const controller = new (class extends Controller<TMediaActions, IMediaState> {
    protected getReducerMap(): IActionHandlerMap<TMediaActions, IMediaState> {
        return {
            [mediaActions.load]: this.load,
        }
    }

    protected getInitialState(): IMediaState {
        return {
            all: [],
        }
    }

    private load(state: IMediaState, response: ILoadMedia): IMediaState {
        return { ...state, all: response.media || [] }
    }
})()

export const MediaReducer = controller.reducer
