import { Application, Router } from 'express'

import { containerApi } from './container'
import { genreApi } from './genre'
import { getSchema } from './getSchemas'
import { getVersion } from './getVersion'
import { languageApi } from './language'
import { mediaApi } from './media'
import { seriesApi } from './series'

export function installApi(app: Application): void {
    const apiRoute = Router()

    apiRoute.use(containerApi)
    apiRoute.use(genreApi)
    apiRoute.use(getSchema)
    apiRoute.use(getVersion)
    apiRoute.use(languageApi)
    apiRoute.use(mediaApi)
    apiRoute.use(seriesApi)

    app.use('/api', apiRoute)
}
