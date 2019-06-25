import { ILoadMedia, IMediaState } from 'movie-db-client'

export function getInitialState(): IMediaState {
    return {
        all: [],
    }
}

export function load(state: IMediaState, response: ILoadMedia): IMediaState {
    return { ...state, all: response.media || [] }
}
