import { ISeriesResponse } from 'movie-db-api'
import { ILoadSeries, seriesActions } from 'movie-db-client'

export class SeriesActions {
    static load(response: ISeriesResponse): ILoadSeries {
        return { series: response.list, type: seriesActions.load }
    }
}
