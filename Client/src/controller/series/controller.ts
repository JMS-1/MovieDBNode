import { ILanguage, ISeries } from 'movie-db-api'
import * as local from 'movie-db-client'

import { SeriesActions } from './actions'

import { EditController } from '../controller'

import { ServerApi } from '../../store'

type TSeriesActions =
    | local.ICancelSeriesEdit
    | local.ILoadSchemas
    | local.ILoadSeries
    | local.ISaveSeries
    | local.ISelectSeries
    | local.ISeriesSaved
    | local.ISetSeriesProperty<any>
    | local.ISetSeriesTreeFilter

const controller = new (class extends EditController<ILanguage, TSeriesActions, local.ISeriesState> {
    protected readonly schema = 'series'

    protected readonly afterCancel = local.routes.series

    protected readonly afterSave = local.routes.series

    protected getReducerMap(): local.IActionHandlerMap<TSeriesActions, local.ISeriesState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.seriesActions.cancel]: this.cancelEdit,
            [local.seriesActions.filter]: this.setFilter,
            [local.seriesActions.load]: this.load,
            [local.seriesActions.save]: this.startSave,
            [local.seriesActions.saveDone]: this.saveDone,
            [local.seriesActions.select]: this.select,
            [local.seriesActions.setProp]: this.setProperty,
        }
    }

    protected getInitialState(): local.ISeriesState {
        return {
            ...super.getInitialState(),
            filter: '',
        }
    }

    private setFilter(state: local.ISeriesState, request: local.ISetSeriesTreeFilter): local.ISeriesState {
        if (request.filter === state.filter) {
            return state
        }

        return { ...state, filter: request.filter }
    }

    protected createEmpty(): ISeries {
        return {
            _id: '',
            name: '',
        }
    }

    private startSave(state: local.ISeriesState, request: local.ISaveSeries): local.ISeriesState {
        if (state.workingCopy) {
            if (state.workingCopy._id) {
                ServerApi.put(`series/${state.workingCopy._id}`, state.workingCopy, SeriesActions.saveDone)
            } else {
                ServerApi.post('series', state.workingCopy, SeriesActions.saveDone)
            }
        }

        return state
    }
})()

export const SeriesReducer = controller.reducer
