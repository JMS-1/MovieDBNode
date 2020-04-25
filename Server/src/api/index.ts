import { Application, Router } from 'express'

import { getVersion } from './getVersion'
import { recordingApi } from './recording'

export function installApi(app: Application): void {
    const apiRoute = Router()

    apiRoute.use(getVersion)
    apiRoute.use(recordingApi)

    app.use('/api', apiRoute)
}
