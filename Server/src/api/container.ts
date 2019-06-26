import { Router } from 'express'

import { IContainerResponse, INewContainer, IUpdateContainerResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { containerCollection, toEntity, toProtocol } from '../database/container'

export const containerApi = Router().use(
    '/container',
    Router()
        .get('/', (request, response, next) =>
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
        )
        .put('/:id', (request, response, next) =>
            processApiRequest(
                async (req: INewContainer) => {
                    const container = toEntity(req, request.params.id)

                    return <IUpdateContainerResponse>{
                        container: toProtocol(container),
                        errors: await containerCollection.update(container),
                    }
                },
                request,
                response,
            ),
        ),
)
