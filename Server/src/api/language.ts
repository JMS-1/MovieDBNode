import { createApiRouter } from './utils'

import { languageCollection, toEntity, toProtocol } from '../database/language'

export const languageApi = createApiRouter('/language', languageCollection, toProtocol, toEntity)
