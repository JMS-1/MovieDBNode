import { IContainerState, ILoadContainers, ISetContainerTreeFilter } from 'movie-db-client'

export function getInitialState(): IContainerState {
    return {
        all: [],
        filter: '',
    }
}

export function load(state: IContainerState, response: ILoadContainers): IContainerState {
    return { ...state, all: response.containers || [] }
}

export function setFilter(state: IContainerState, request: ISetContainerTreeFilter): IContainerState {
    if (request.filter === state.filter) {
        return state
    }

    return { ...state, filter: request.filter }
}
