import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import {
    IApiDeleteResponse, INewRecording, IRecordingQueryRequest, IUpdateRecordingResponse,
} from 'movie-db-api'

import { processApiRequest } from './utils'

import { recordingCollection, toEntity, toProtocol } from '../database/recording'

export const recordingApi = Router().use(
    '/recording',
    Router()
        .get('/:id', (request, response, next) =>
            processApiRequest(
                async () => toProtocol(await recordingCollection.findOne(request.params.id)),
                request,
                response,
            ),
        )
        .get('/container/:id', (request, response, next) =>
            processApiRequest(
                async () => await recordingCollection.queryContainer(request.params.id),
                request,
                response,
            ),
        )
        .delete('/:id', (request, response) =>
            processApiRequest(
                async () =>
                    <IApiDeleteResponse>{
                        id: request.params.id,
                        errors: await recordingCollection.deleteOne(request.params.id),
                    },
                request,
                response,
            ),
        )
        .post('/search', (request, response, next) =>
            processApiRequest(
                async (req: IRecordingQueryRequest) => await recordingCollection.query(req),
                request,
                response,
            ),
        )
        .put('/:id', (request, response, next) =>
            processApiRequest(
                async (req: INewRecording) => {
                    const recording = toEntity(req, request.params.id, undefined)

                    return <IUpdateRecordingResponse>{
                        errors: await recordingCollection.findOneAndReplace(recording),
                        item: toProtocol(recording),
                    }
                },
                request,
                response,
            ),
        )
        .post('/', (request, response, next) =>
            processApiRequest(
                async (req: INewRecording) => {
                    const recording = toEntity(req, uuid(), new Date().toISOString())

                    return <IUpdateRecordingResponse>{
                        errors: await recordingCollection.insertOne(recording),
                        item: toProtocol(recording),
                    }
                },
                request,
                response,
            ),
        ),
)
