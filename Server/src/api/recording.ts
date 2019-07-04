import { Router } from 'express'
import { v4 as uuid } from 'uuid'

import * as movieDbApi from 'movie-db-api'

import { processApiRequest } from './utils'

import { genreCollection } from '../database/genre'
import { languageCollection } from '../database/language'
import { recordingCollection, toEntity, toProtocol } from '../database/recording'

let csvData = ''

function escape(str: string): string {
    return `"${(str || '').replace(/"/g, '""')}"`
}

export const recordingApi = Router().use(
    '/recording',
    Router()
        .get('/export', (request, response, next) => {
            response.setHeader('Content-disposition', 'attachment; filename=export.csv')
            response.setHeader('Content-Type', 'text/csv')
            response.status(200)
            response.write(csvData)
            response.end()
        })
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
                    <movieDbApi.IApiDeleteResponse>{
                        id: request.params.id,
                        errors: await recordingCollection.deleteOne(request.params.id),
                    },
                request,
                response,
            ),
        )
        .post('/search', (request, response, next) =>
            processApiRequest(
                async (req: movieDbApi.IRecordingQueryRequest) => await recordingCollection.query(req),
                request,
                response,
            ),
        )
        .post('/export/query', (request, response, next) =>
            processApiRequest(
                async (req: movieDbApi.IRecordingQueryRequest) => {
                    const all = await recordingCollection.query(req)

                    const languageMap: { [id: string]: string } = {}
                    const languages = await languageCollection.find()
                    languages.forEach(l => (languageMap[l._id] = l.name))

                    const genreMap: { [id: string]: string } = {}
                    const genres = await genreCollection.find()
                    genres.forEach(g => (genreMap[g._id] = g.name))

                    csvData = 'Name;Sprachen;Kategorien\r\n'

                    for (let recording of all.list) {
                        const name = escape(recording.fullName)
                        const languages = escape((recording.languages || []).map(l => languageMap[l] || l).join('; '))
                        const genres = escape((recording.genres || []).map(l => genreMap[l] || l).join('; '))

                        csvData += `${name};${languages};${genres}\r\n`
                    }

                    return {}
                },
                request,
                response,
            ),
        )
        .post('/', (request, response, next) =>
            processApiRequest(
                async (req: movieDbApi.INewRecording) => {
                    const recording = toEntity(req, uuid(), new Date().toISOString())

                    return <movieDbApi.IUpdateRecordingResponse>{
                        errors: await recordingCollection.insertOne(recording),
                        item: toProtocol(recording),
                    }
                },
                request,
                response,
            ),
        )
        .put('/:id', (request, response, next) =>
            processApiRequest(
                async (req: movieDbApi.INewRecording) => {
                    const recording = toEntity(req, request.params.id, undefined)

                    return <movieDbApi.IUpdateRecordingResponse>{
                        errors: await recordingCollection.findOneAndReplace(recording),
                        item: toProtocol(recording),
                    }
                },
                request,
                response,
            ),
        ),
)
