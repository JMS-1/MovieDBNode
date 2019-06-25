import { isoDate, uniqueId } from './utils'

export const collectionName = 'Recordings'

export interface IDbRecording {
    _id: string
    created: string
    description?: string
    genres: string[]
    languages: string[]
    media: string
    name: string
    rentTo?: string
    series?: string
}

export const RecordingSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/recording.json',
    additionalProperties: false,
    type: 'object',
    message: 'Aufzeichnung unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        created: {
            message: 'Zeitpunkt fehlt oder ist ungültig',
            pattern: isoDate,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        genres: {
            message: 'Genres sind ungültig',
            type: 'array',
            items: {
                message: 'Genre ist ungültig',
                pattern: uniqueId,
                type: 'string',
            },
        },
        languages: {
            message: 'Sprachen sind ungültig',
            type: 'array',
            items: {
                message: 'Sprache ist ungültig',
                pattern: uniqueId,
                type: 'string',
            },
        },
        media: {
            message: 'Medium fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 200,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        rentTo: {
            maxLength: 200,
            message: 'Verleiher zu lang',
            type: 'string',
        },
        series: {
            message: 'Serie ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
    },
    required: ['_id', 'name', 'created', 'media', 'genres', 'languages'],
}
