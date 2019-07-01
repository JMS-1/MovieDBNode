declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { ISeries } from 'movie-db-api'

    interface ISeriesState extends IEditState<ISeries> {
        readonly filter: string
    }

    const enum seriesActions {
        cancel = 'movie-db.series.cancel-edit',
        filter = 'movie-db.series.set-filter',
        load = 'movie-db.series.load',
        save = 'movie-db.series.save',
        saveDone = 'movie-db.series.save-done',
        select = 'movie-db.series.select',
        setProp = 'movie-db.series.set-prop',
    }

    interface ILoadSeries extends IGenericLoad<ISeries> {
        type: seriesActions.load
    }

    interface ISetSeriesTreeFilter extends Action {
        filter: string
        type: seriesActions.filter
    }

    interface ISetSeriesProperty<TProp extends keyof ISeries> extends ISetGenericProperty<ISeries, TProp> {
        type: seriesActions.setProp
    }

    interface ISelectSeries extends IGenericSelect {
        type: seriesActions.select
    }

    interface ISeriesSaved extends IGenericSaveDone<ISeries> {
        type: seriesActions.saveDone
    }

    interface ICancelSeriesEdit extends IGenericCancelEdit {
        type: seriesActions.cancel
    }

    interface ISaveSeries extends Action {
        type: seriesActions.save
    }
}
