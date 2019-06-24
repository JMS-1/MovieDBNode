import { IContainerState, ILoadContainers } from 'movie-db-client'

export function getInitialState(): IContainerState {
    return {
        all: [],
    }
}

export function load(state: IContainerState, response: ILoadContainers): IContainerState {
    return { ...state, all: response.containers || [] }
}
