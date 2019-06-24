import { Application, Router } from 'express'

import { getSchema } from './getSchemas'
import { getVersion } from './getVersion'

export function installApi(app: Application): void {
    const apiRoute = Router()

    apiRoute.use(getSchema)
    apiRoute.use(getVersion)

    app.use('/api', apiRoute)
}
