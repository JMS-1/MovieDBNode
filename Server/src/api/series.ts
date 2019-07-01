import { createApiRouter } from './utils'

import { seriesCollection, toEntity, toProtocol } from '../database/series'

export const seriesApi = createApiRouter('/series', seriesCollection, toProtocol, toEntity)
