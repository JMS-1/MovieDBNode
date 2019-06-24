import { containerActions, IContainerState, ILoadContainers } from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

type IAction = ILoadContainers

export function ContainerReducer(state: IContainerState, action: IAction): IContainerState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case containerActions.load:
            return controller.load(state, action)
    }

    return state
}
