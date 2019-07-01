import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class SeriesActions {
    static load(response: api.ISeriesResponse): local.ILoadSeries {
        return { series: response.list, type: local.seriesActions.load }
    }

    static setFilter(filter: string): local.ISetSeriesTreeFilter {
        return { filter, type: local.seriesActions.filter }
    }
}
