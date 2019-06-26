import { ILoadSeries, ISeriesState, seriesActions } from 'movie-db-client'

import { Controller, IActionHandlerMap } from '../controller'

type TSeriesActions = ILoadSeries

const controller = new (class extends Controller<TSeriesActions, ISeriesState> {
    protected getReducerMap(): IActionHandlerMap<TSeriesActions, ISeriesState> {
        return {
            [seriesActions.load]: this.load,
        }
    }

    protected getInitialState(): ISeriesState {
        return {
            all: [],
        }
    }

    private load(state: ISeriesState, response: ILoadSeries): ISeriesState {
        return { ...state, all: response.series || [] }
    }
})()

export const SeriesReducer = controller.reducer
