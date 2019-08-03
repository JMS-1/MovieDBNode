import { getMessage } from '@jms-1/isxs-tools'
import { json } from 'body-parser'
import * as debug from 'debug'
import * as express from 'express'
import { join } from 'path'

import { installApi } from './api'
import { Config } from './config'
import { initializeDatabase } from './database'

async function startup(): Promise<void> {
    await initializeDatabase()

    // await runMigration()

    const app = express()

    app.use(express.static(join(__dirname, '../dist')))
    app.use(json())

    installApi(app)

    app.listen(Config.port)
}

function startupError(error: any): void {
    debug('startup')('%s', getMessage(error))
}

try {
    startup()
        .then(undefined, startupError)
        .catch(startupError)
} catch (error) {
    startupError(error)
}
