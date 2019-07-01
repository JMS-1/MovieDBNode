declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { ISeries } from 'movie-db-api'

    interface ISeriesState {
        readonly all: ISeries[]
        readonly filter: string
    }

    const enum seriesActions {
        filter = 'movie-db.series.set-filter',
        load = 'movie-db.series.load',
    }

    interface ILoadSeries extends Action {
        series: ISeries[]
        type: seriesActions.load
    }

    interface ISetSeriesTreeFilter extends Action {
        filter: string
        type: seriesActions.filter
    }
}
