import { Router } from 'express'

import { ISchemaResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { RecordingSchema } from '../database/recording'

export const getSchema = Router().get('/schemas', (request, response, next) =>
    processApiRequest(
        () =>
            <ISchemaResponse>{
                recording: RecordingSchema,
            },
        request,
        response
    )
)
