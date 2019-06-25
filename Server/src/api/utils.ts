import 'body-parser'
import { Request, Response } from 'express'

import { apiError, getError } from '../utils'

export function processApiRequest<TResponse, TRequest = {}>(
    processor: (body?: TRequest) => TResponse | Promise<TResponse>,
    request: Request,
    response: Response,
): void {
    function onError(error: any): void {
        const message = getError(error)

        try {
            response.write(message)
            response.sendStatus(400)
        } catch (error) {
            apiError('unable to process %s: %s', request.originalUrl, message)
        }
    }

    try {
        const result = processor(request.body)
        const promise = result instanceof Promise ? result : Promise.resolve(result)

        promise
            .then(data => {
                try {
                    response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate').json(data)
                } catch (error) {
                    onError(error)
                }
            }, onError)
            .catch(onError)
    } catch (error) {
        onError(error)
    }
}