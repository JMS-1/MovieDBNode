import { Router } from 'express'

import { INewRecording, IRecordingQueryRequest, IUpdateRecordingResponse } from 'movie-db-api'

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
                        recording: toProtocol(recording),
                        errors: await recordingCollection.findOneAndReplace(recording),
                    }
                },
                request,
                response,
            ),
        ),
)
