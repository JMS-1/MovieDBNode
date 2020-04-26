import { getMessage } from '@jms-1/isxs-tools'
import { createSchemaConfiguration } from '@jms-1/mongodb-graphql/lib/schema'
import { ApolloServer } from 'apollo-server-express'
import { json } from 'body-parser'
import debug from 'debug'
import express from 'express'
import { GraphQLSchema } from 'graphql'
import { join } from 'path'

import { ContainerCollection } from './collections/container'
import { GenreCollection } from './collections/genre'
import { LanguageCollection } from './collections/language'
import { RecordingCollection, csvData } from './collections/recording'
import { SeriesCollection } from './collections/series'
import { Config } from './config'

const utfBom = Buffer.from([0xef, 0xbb, 0xbf])

async function startup(): Promise<void> {
    const app = express()

    app.use(express.static(join(__dirname, '../dist')))
    app.use(json())

    app.get('/export', (_request, response) => {
        response.setHeader('Content-disposition', 'attachment; filename=export.csv')
        response.setHeader('Content-Type', 'text/csv; charset=utf-8')
        response.status(200)
        response.write(utfBom)
        response.write(csvData, 'utf-8')
        response.end()
    })

    const server = new ApolloServer({
        schema: new GraphQLSchema(
            await createSchemaConfiguration({
                containers: ContainerCollection,
                genres: GenreCollection,
                languages: LanguageCollection,
                recordings: RecordingCollection,
                series: SeriesCollection,
            })
        ),
    })

    server.applyMiddleware({ app })

    app.listen(Config.port)
}

function startupError(error: unknown): void {
    debug('startup')('%s', getMessage(error))
}

try {
    startup().then(undefined, startupError).catch(startupError)
} catch (error) {
    startupError(error)
}
