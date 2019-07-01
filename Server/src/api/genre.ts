import { createApiRouter } from './utils'

import { genreCollection, toEntity, toProtocol } from '../database/genre'

export const genreApi = createApiRouter('/genre', genreCollection, toProtocol, toEntity)
