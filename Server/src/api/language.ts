import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import { ILanguageResponse, INewLanguage, IUpdateLanguageResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { languageCollection, toEntity, toProtocol } from '../database/language'

export const languageApi = Router().use(
    '/language',
    Router()
        .get('/', (request, response, next) =>
            processApiRequest(
                async () => {
                    const languages = await languageCollection.find()

                    return <ILanguageResponse>{
                        languages: languages.map(toProtocol),
                    }
                },
                request,
                response,
            ),
        )
        .put('/:id', (request, response, next) =>
            processApiRequest(
                async (req: INewLanguage) => {
                    const language = toEntity(req, request.params.id)

                    return <IUpdateLanguageResponse>{
                        language: toProtocol(language),
                        errors: await languageCollection.findOneAndReplace(language),
                    }
                },
                request,
                response,
            ),
        )
        .post('/', (request, response, next) =>
            processApiRequest(
                async (req: INewLanguage) => {
                    const language = toEntity(req, uuid())

                    return <IUpdateLanguageResponse>{
                        language: toProtocol(language),
                        errors: await languageCollection.insertOne(language),
                    }
                },
                request,
                response,
            ),
        ),
)
