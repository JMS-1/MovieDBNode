import { uniqueId } from './utils'

export const collectionName = 'genres'

const enum GenreFields {
    _id = '_id',
    name = 'name',
}

export interface IDbGenre {
    [GenreFields._id]: string
    [GenreFields.name]: string
}

export const GenreSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/genre.json',
    additionalProperties: false,
    type: 'object',
    message: 'Genre unvollständig',
    properties: {
        [GenreFields._id]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [GenreFields.name]: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
    },
    required: [GenreFields._id, GenreFields.name],
}
