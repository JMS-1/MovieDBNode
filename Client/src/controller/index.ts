import { IValidationError } from 'movie-db-api'

export * from './app'
export * from './container'
export * from './genre'
export * from './language'
export * from './media'
export * from './mui'
export * from './series'

export function getErrors<TType, TProp extends keyof TType>(
    errors: IValidationError[],
    prop: TProp,
    edit: TType,
): string[] {
    const list = errors && errors.filter(e => e.property === prop)

    return list && list.length > 0 && list.map(e => `${e.message} (${e.constraint})`)
}
