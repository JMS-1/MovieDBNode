import { isoDate, uniqueId } from './utils'

export const collectionName = 'Recordings'

const enum RecordingFields {
    _id = '_id',
    created = 'created',
    description = 'description',
    media = 'media',
    name = 'name',
    rentTo = 'rentTo',
    series = 'series',
}

export interface IDbRecording {
    [RecordingFields._id]: string
    [RecordingFields.created]: string
    [RecordingFields.description]?: string
    [RecordingFields.media]: string
    [RecordingFields.name]: string
    [RecordingFields.rentTo]?: string
    [RecordingFields.series]?: string
}

export const RecordingSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/recording.json',
    additionalProperties: false,
    type: 'object',
    message: 'Aufzeichnung unvollständig',
    properties: {
        [RecordingFields._id]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [RecordingFields.created]: {
            message: 'Zeitpunkt fehlt oder ist ungültig',
            pattern: isoDate,
            type: 'string',
        },
        [RecordingFields.description]: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        [RecordingFields.media]: {
            message: 'Medium fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [RecordingFields.name]: {
            maxLength: 200,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        [RecordingFields.rentTo]: {
            maxLength: 200,
            message: 'Verleiher zu lang',
            type: 'string',
        },
        [RecordingFields.series]: {
            message: 'Serie ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
    },
    required: [RecordingFields._id, RecordingFields.name, RecordingFields.created, RecordingFields.media],
}
