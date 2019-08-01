import { ISchema } from '@jms-1/isxs-validation'

import { ILanguage, INewLanguage } from 'movie-db-api'

export const collectionName = 'languages'

export interface IDbLanguage extends ILanguage {}

export const LanguageSchema: ISchema<ILanguage> = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/language.json',
    additionalProperties: false,
    type: 'object',
    message: 'Sprache unvollständig',
    properties: {
        _id: {
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
    },
    required: ['name'],
}

export function toProtocol(language: IDbLanguage): ILanguage {
    return language
}

export function toEntity(language: INewLanguage, id: string): IDbLanguage {
    const dbLanguage: IDbLanguage = {
        _id: id,
        name: language.name,
    }

    return dbLanguage
}
