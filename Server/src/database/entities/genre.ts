import { IGenre, INewGenre } from 'movie-db-api'

import { uniqueId } from './utils'

export const collectionName = 'genres'

export interface IDbGenre {
    _id: string
    name: string
}

export const GenreSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/genre.json',
    additionalProperties: false,
    type: 'object',
    message: 'Genre unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
    },
    required: ['_id', 'name'],
}

export function toProtocol(genre: IDbGenre): IGenre {
    return {
        _id: genre._id,
        name: genre.name,
    }
}

export function toEntity(container: INewGenre, id: string): IDbGenre {
    const dbGenre: IDbGenre = {
        _id: id,
        name: container.name,
    }

    return dbGenre
}
