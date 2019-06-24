import { Application, Router } from 'express'

import { containerApi } from './container'
import { getSchema } from './getSchemas'
import { getVersion } from './getVersion'

export function installApi(app: Application): void {
    const apiRoute = Router()

    apiRoute.use(getSchema)
    apiRoute.use(getVersion)
    apiRoute.use(containerApi)

    app.use('/api', apiRoute)
}
