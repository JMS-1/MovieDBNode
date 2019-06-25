import { mediaType } from 'movie-db-api'

import { uniqueId } from './utils'

export const collectionName = 'medias'

const enum MediaFields {
    _id = '_id',
    container = 'container',
    position = 'position',
    type = 'type',
}

export interface IDbMedia {
    [MediaFields._id]: string
    [MediaFields.container]?: string
    [MediaFields.position]?: string
    [MediaFields.type]: mediaType
}

export const MediaSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/media.json',
    additionalProperties: false,
    type: 'object',
    message: 'Medium unvollständig',
    properties: {
        [MediaFields._id]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [MediaFields.container]: {
            message: 'Ablage ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [MediaFields.position]: {
            maxLength: 100,
            message: 'Standort zu lang',
            type: 'string',
        },
        [MediaFields.type]: {
            message: 'Medienart fehlt oder ist unzulässig',
            type: 'integer',
            enum: [
                mediaType.BluRay,
                mediaType.DVD,
                mediaType.RecordedDVD,
                mediaType.SuperVideoCD,
                mediaType.Undefined,
                mediaType.VideoCD,
            ],
        },
    },
    required: [MediaFields._id, MediaFields.type],
}
