import { Router } from 'express'

import { IMediaResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { mediaCollection, toProtocol } from '../database/media'

export const mediaApi = Router().use(
    '/media',
    Router().get('/', (request, response, next) =>
        processApiRequest(
            async () => {
                const media = await mediaCollection.query()

                return <IMediaResponse>{
                    media: media.map(toProtocol),
                }
            },
            request,
            response,
        ),
    ),
)
