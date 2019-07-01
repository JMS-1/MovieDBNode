import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import { IGenreResponse, INewGenre, IUpdateGenreResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { genreCollection, toEntity, toProtocol } from '../database/genre'

export const genreApi = Router().use(
    '/genre',
    Router()
        .get('/', (request, response, next) =>
            processApiRequest(
                async () => {
                    const genres = await genreCollection.find()

                    return <IGenreResponse>{
                        genres: genres.map(toProtocol),
                    }
                },
                request,
                response,
            ),
        )
        .put('/:id', (request, response, next) =>
            processApiRequest(
                async (req: INewGenre) => {
                    const genre = toEntity(req, request.params.id)

                    return <IUpdateGenreResponse>{
                        genre: toProtocol(genre),
                        errors: await genreCollection.findOneAndReplace(genre),
                    }
                },
                request,
                response,
            ),
        )
        .post('/', (request, response, next) =>
            processApiRequest(
                async (req: INewGenre) => {
                    const genre = toEntity(req, uuid())

                    return <IUpdateGenreResponse>{
                        genre: toProtocol(genre),
                        errors: await genreCollection.insertOne(genre),
                    }
                },
                request,
                response,
            ),
        ),
)
