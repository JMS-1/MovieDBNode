import { getMessage } from '@jms-1/isxs-tools'
import { createSchemaConfiguration } from '@jms-1/mongodb-graphql/lib/schema'
import { ApolloServer } from 'apollo-server-express'
import { json } from 'body-parser'
import debug from 'debug'
import express from 'express'
import { GraphQLSchema } from 'graphql'
import { join } from 'path'

import { installApi } from './api'
import { ContainerCollection } from './collections/container'
import { GenreCollection } from './collections/genre'
import { LanguageCollection } from './collections/language'
import { RecordingCollection } from './collections/recording'
import { SeriesCollection } from './collections/series'
import { Config } from './config'

async function startup(): Promise<void> {
    const app = express()

    app.use(express.static(join(__dirname, '../dist')))
    app.use(json())

    installApi(app)

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
