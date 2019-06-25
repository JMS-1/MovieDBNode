import { IValidationError } from 'movie-db-api'

export * from './app'
export * from './container'
export * from './genre'
export * from './language'
export * from './media'
export * from './mui'
export * from './series'

export function getError<TType, TProp extends keyof TType>(
    errors: IValidationError[],
    prop: TProp,
    edit: TType,
): string {
    const error = errors && errors.find(e => e.property === prop)

    return error && `${error.message} (${error.constraint})`
}
