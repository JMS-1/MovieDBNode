import { Router } from 'express'

import { ILanguageResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { languageCollection, toProtocol } from '../database/language'

export const languageApi = Router().use(
    '/language',
    Router().get('/', (request, response, next) =>
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
    ),
)
