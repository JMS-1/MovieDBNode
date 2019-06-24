import { Router } from 'express'

import { IContainerResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { containerCollection } from '../database/container'
import { toProtocol } from '../database/entities/container'

export const containerApi = Router().use(
    '/container',
    Router().get('/', (request, response, next) =>
        processApiRequest(
            async () => {
                const containers = await containerCollection.query()

                return <IContainerResponse>{
                    containers: containers.map(toProtocol),
                }
            },
            request,
            response,
        ),
    ),
)
