import { Application } from 'express'

import { getVersion } from './getVersion'

export function installApi(app: Application): void {
    app.use(getVersion)
}
