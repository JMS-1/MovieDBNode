import { uniqueId } from './utils'

export const collectionName = 'languages'

const enum LanguageFields {
    _id = '_id',
    name = 'name',
}

export interface IDbLanguage {
    [LanguageFields._id]: string
    [LanguageFields.name]: string
}

export const LanguageSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/language.json',
    additionalProperties: false,
    type: 'object',
    message: 'Sprache unvollständig',
    properties: {
        [LanguageFields._id]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [LanguageFields.name]: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
    },
    required: [LanguageFields._id, LanguageFields.name],
}
