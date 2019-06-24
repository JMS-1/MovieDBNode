import { Router } from 'express'

import { ISchemaResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { ContainerSchema } from '../database/entities/container'

export const getSchema = Router().get('/schemas', (request, response, next) =>
    processApiRequest(() => <ISchemaResponse>{ container: ContainerSchema }, request, response),
)
