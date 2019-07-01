import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import { INewSeries, ISeriesResponse, IUpdateSeriesResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { seriesCollection, toEntity, toProtocol } from '../database/series'

export const seriesApi = Router().use(
    '/series',
    Router()
        .get('/', (request, response, next) =>
            processApiRequest(
                async () => {
                    const series = await seriesCollection.find()

                    return <ISeriesResponse>{
                        series: series.map(toProtocol),
                    }
                },
                request,
                response,
            ),
        )
        .put('/:id', (request, response, next) =>
            processApiRequest(
                async (req: INewSeries) => {
                    const series = toEntity(req, request.params.id)

                    return <IUpdateSeriesResponse>{
                        series: toProtocol(series),
                        errors: await seriesCollection.findOneAndReplace(series),
                    }
                },
                request,
                response,
            ),
        )
        .post('/', (request, response, next) =>
            processApiRequest(
                async (req: INewSeries) => {
                    const series = toEntity(req, uuid())

                    return <IUpdateSeriesResponse>{
                        series: toProtocol(series),
                        errors: await seriesCollection.insertOne(series),
                    }
                },
                request,
                response,
            ),
        ),
)
