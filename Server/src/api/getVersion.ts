import { Router } from 'express'

import { processApiRequest } from './utils'

export const getVersion = Router().get('/version', (request, response, next) =>
    processApiRequest(() => ({ version: '0.1' }), request, response)
)
