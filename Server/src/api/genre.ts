import { Router } from 'express'

import { IGenreResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { genreCollection, toProtocol } from '../database/genre'

export const genreApi = Router().use(
    '/genre',
    Router().get('/', (request, response, next) =>
        processApiRequest(
            async () => {
                const genres = await genreCollection.find()

                return <IGenreResponse>{
                    genres: genres.map(toProtocol),
                }
            },
            request,
            response
        )
    )
)
