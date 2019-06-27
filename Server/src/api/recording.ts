import { Router } from 'express'

import { IRecordingQueryRequest } from 'movie-db-api'

import { processApiRequest } from './utils'

import { recordingCollection, toProtocol } from '../database/recording'

export const recordingApi = Router().use(
    '/recording',
    Router()
        .get('/:id', (request, response, next) =>
            processApiRequest(
                async () => toProtocol(await recordingCollection.findOne(request.params.id)),
                request,
                response,
            ),
        )
        .post('/search', (request, response, next) =>
            processApiRequest(
                async (req: IRecordingQueryRequest) => await recordingCollection.query(req),
                request,
                response,
            ),
        ),
)
