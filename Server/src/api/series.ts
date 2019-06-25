import { Router } from 'express'

import { ISeriesResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { seriesCollection, toProtocol } from '../database/series'

export const seriesApi = Router().use(
    '/series',
    Router().get('/', (request, response, next) =>
        processApiRequest(
            async () => {
                const series = await seriesCollection.query()

                return <ISeriesResponse>{
                    series: series.map(toProtocol),
                }
            },
            request,
            response,
        ),
    ),
)
