import { Application } from 'express'

import { getSchema } from './getSchemas'
import { getVersion } from './getVersion'

export function installApi(app: Application): void {
    app.use(getSchema)
    app.use(getVersion)
}
