declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { ISeries } from 'movie-db-api'

    interface ISeriesState {
        readonly all: ISeries[]
    }

    const enum seriesActions {
        load = 'movie-db.series.load',
    }

    interface ILoadSeries extends Action {
        series: ISeries[]
        type: seriesActions.load
    }
}
