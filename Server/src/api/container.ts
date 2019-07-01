import { createApiRouter } from './utils'

import { containerCollection, toEntity, toProtocol } from '../database/container'

export const containerApi = createApiRouter('/container', containerCollection, toProtocol, toEntity)
