import { Router } from 'express'

import { processApiRequest } from './utils'

const utfBom = Buffer.from([0xef, 0xbb, 0xbf])

const csvData = ''

export function escape(str: string): string {
    return `"${(str || '').replace(/"/g, '""')}"`
}

export const recordingApi = Router().use(
    '/recording',
    Router()
        .get('/export', (request, response, next) => {
            response.setHeader('Content-disposition', 'attachment; filename=export.csv')
            response.setHeader('Content-Type', 'text/csv; charset=utf-8')
            response.status(200)
            response.write(utfBom)
            response.write(csvData, 'utf-8')
            response.end()
        })
        .post('/export/query', (request, response, next) =>
            processApiRequest(
                async (req: unknown) => {
                    /*
                    const all = await recordingCollection.query(req)

                    const languageMap: { [id: string]: string } = {}
                    const languages = await languageCollection.find()
                    languages.forEach((l) => (languageMap[l._id] = l.name))

                    const genreMap: { [id: string]: string } = {}
                    const genres = await genreCollection.find()
                    genres.forEach((g) => (genreMap[g._id] = g.name))

                    csvData = 'Name;Sprachen;Kategorien\r\n'

                    for (const recording of all.list) {
                        const name = escape(recording.fullName)
                        const languages = escape((recording.languages || []).map((l) => languageMap[l] || l).join('; '))
                        const genres = escape((recording.genres || []).map((l) => genreMap[l] || l).join('; '))

                        csvData += `${name};${languages};${genres}\r\n`
                    }
                    */

                    return {}
                },
                request,
                response
            )
        )
)
