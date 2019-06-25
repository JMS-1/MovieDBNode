import { ILoadSeries, ISeriesState } from 'movie-db-client'

export function getInitialState(): ISeriesState {
    return {
        all: [],
    }
}

export function load(state: ISeriesState, response: ILoadSeries): ISeriesState {
    return { ...state, all: response.series || [] }
}
