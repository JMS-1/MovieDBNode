import { ISeries } from 'movie-db-api'
import { ILoadSeries, seriesActions } from 'movie-db-client'

export class SeriesActions {
    static load(series: ISeries[]): ILoadSeries {
        return { series, type: seriesActions.load }
    }
}
