import * as local from 'movie-db-client'

import { Controller } from '../controller'

type TSeriesActions = local.ILoadSeries | local.ISetSeriesTreeFilter

const controller = new (class extends Controller<TSeriesActions, local.ISeriesState> {
    protected getReducerMap(): local.IActionHandlerMap<TSeriesActions, local.ISeriesState> {
        return {
            [local.seriesActions.filter]: this.setFilter,
            [local.seriesActions.load]: this.load,
        }
    }

    protected getInitialState(): local.ISeriesState {
        return {
            all: [],
            filter: '',
        }
    }

    private load(state: local.ISeriesState, response: local.ILoadSeries): local.ISeriesState {
        return { ...state, all: response.series || [] }
    }

    private setFilter(state: local.ISeriesState, request: local.ISetSeriesTreeFilter): local.ISeriesState {
        if (request.filter === state.filter) {
            return state
        }

        return { ...state, filter: request.filter }
    }
})()

export const SeriesReducer = controller.reducer
