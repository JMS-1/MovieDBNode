import { ISchema } from '@jms-1/isxs-validation'

import { IGenre, INewGenre } from 'movie-db-api'

export const collectionName = 'genres'

export interface IDbGenre extends IGenre {}

export const GenreSchema: ISchema<IGenre> = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/genre.json',
    additionalProperties: false,
    type: 'object',
    message: { de: 'Genre unvollständig' },
    properties: {
        _id: {
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: { de: 'Name nicht angegeben oder zu lang' },
            minLength: 1,
            type: 'string',
        },
    },
    required: ['name'],
}

export function toProtocol(genre: IDbGenre): IGenre {
    return genre
}

export function toEntity(container: INewGenre, id: string): IDbGenre {
    const dbGenre: IDbGenre = {
        _id: id,
        name: container.name,
    }

    return dbGenre
}
