import { Application, Router } from 'express'

import { recordingApi } from './recording'

export function installApi(app: Application): void {
    const apiRoute = Router()

    apiRoute.use(recordingApi)

    app.use('/api', apiRoute)
}
