import { Router } from 'express'

import { ISchemaResponse } from 'movie-db-api'

import { processApiRequest } from './utils'

import { ContainerSchema } from '../database/entities/container'
import { GenreSchema } from '../database/genre'
import { LanguageSchema } from '../database/language'
import { MediaSchema } from '../database/media'
import { RecordingSchema } from '../database/recording'
import { SeriesSchema } from '../database/series'

export const getSchema = Router().get('/schemas', (request, response, next) =>
    processApiRequest(
        () =>
            <ISchemaResponse>{
                container: ContainerSchema,
                genre: GenreSchema,
                language: LanguageSchema,
                media: MediaSchema,
                recording: RecordingSchema,
                series: SeriesSchema,
            },
        request,
        response,
    ),
)
