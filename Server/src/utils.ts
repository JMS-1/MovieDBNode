import debug from 'debug'

export const apiError = debug('api')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMessage(error: any, defaultMessage = 'failed'): string {
    return ((typeof error === 'string' ? error : error && `${error.message}`) || '').trim() || defaultMessage
}
