import * as debug from 'debug'

export const apiError = debug('api')

export function getError(error: any): string {
    return typeof error === 'string' ? error : error.message || 'failed'
}
