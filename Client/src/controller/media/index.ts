import { ILoadMedia, IMediaState, mediaActions } from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

type IAction = ILoadMedia

export function MediaReducer(state: IMediaState, action: IAction): IMediaState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case mediaActions.load:
            return controller.load(state, action)
    }

    return state
}
