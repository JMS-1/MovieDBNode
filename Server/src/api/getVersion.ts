import { Router } from 'express'

import { IVersionResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

export const getVersion = Router().get('/version', (request, response, next) =>
    processApiRequest(() => <IVersionResponse>{ version: '0.1' }, request, response),
)
