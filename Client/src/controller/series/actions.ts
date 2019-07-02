import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class SeriesActions {
    static load(response: api.ISeriesResponse): local.ILoadSeries {
        return { list: response.list, type: local.seriesActions.load }
    }

    static setFilter(filter: string): local.ISetSeriesTreeFilter {
        return { filter, type: local.seriesActions.filter }
    }

    static select(id: string): local.ISelectSeries {
        return { id, type: local.seriesActions.select }
    }

    static setProperty<TProp extends keyof api.ISeries>(
        prop: TProp,
        value: api.ISeries[TProp],
    ): local.ISetSeriesProperty<TProp> {
        return { prop, value, type: local.seriesActions.setProp }
    }

    static saveDone(response: api.IUpdateSeriesResponse): local.ISeriesSaved {
        return { item: response.item, errors: response.errors, type: local.seriesActions.saveDone }
    }

    static cancelEdit(): local.ICancelSeriesEdit {
        return { type: local.seriesActions.cancel }
    }

    static save(): local.ISaveSeries {
        return { type: local.seriesActions.save }
    }

    static confirmDelete(): local.IOpenSeriesDelete {
        return { type: local.seriesActions.showConfirm }
    }

    static confirmDeleteDone(confirm: boolean): local.ICloseSeriesDelete {
        return { confirm, type: local.seriesActions.hideConfirm }
    }

    static deleteDone(response: api.IDeleteSeriesResponse): local.ISeriesDeleted {
        return { id: response.id, errors: response.errors, type: local.seriesActions.deleted }
    }
}
