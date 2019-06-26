import { Router } from 'express'

import { IRecordingQueryRequest } from 'movie-db-api'

import { processApiRequest } from './utils'

import { recordingCollection } from '../database/recording'

export const recordingApi = Router().use(
    '/recording',
    Router().post('/search', (request, response, next) =>
        processApiRequest(
            async (req: IRecordingQueryRequest) => await recordingCollection.query(req),
            request,
            response,
        ),
    ),
)
