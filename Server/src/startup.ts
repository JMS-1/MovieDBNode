import * as debug from 'debug'
import * as express from 'express'
import { join } from 'path'

import { installApi } from './api'
import { initializeDatabase } from './database'
import { getError } from './utils'

async function startup(): Promise<void> {
    await initializeDatabase()

    const app = express()

    app.use(express.static(join(__dirname, '../dist')))

    installApi(app)

    app.listen(process.env.PORT)
}

function startupError(error: any): void {
    debug('startup')('%s', getError(error))
}

try {
    startup()
        .then(undefined, startupError)
        .catch(startupError)
} catch (error) {
    startupError(error)
}
