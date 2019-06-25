import { ILoadSeries, ISeriesState, seriesActions } from 'movie-db-client'

import * as controller from './controller'

export * from './actions'

type IAction = ILoadSeries

export function SeriesReducer(state: ISeriesState, action: IAction): ISeriesState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case seriesActions.load:
            return controller.load(state, action)
    }

    return state
}
