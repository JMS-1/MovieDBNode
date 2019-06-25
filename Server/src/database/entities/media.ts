import { IMedia, INewMedia, mediaType } from 'movie-db-api'

import { uniqueId } from './utils'

export const collectionName = 'medias'

export interface IDbMedia {
    _id: string
    containerId?: string
    position?: string
    type: mediaType
}

export const MediaSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/media.json',
    additionalProperties: false,
    type: 'object',
    message: 'Medium unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        containerId: {
            message: 'Ablage ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        position: {
            maxLength: 100,
            message: 'Standort zu lang',
            type: 'string',
        },
        type: {
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
    required: ['_id', 'type'],
}

export function toProtocol(media: IDbMedia): IMedia {
    return {
        _id: media._id,
        containerId: media.containerId || undefined,
        position: media.position || undefined,
        type: media.type,
    }
}

export function toEntity(media: INewMedia, id: string): IDbMedia {
    const dbMedia: IDbMedia = {
        _id: id,
        type: media.type,
    }

    if (media.containerId) {
        dbMedia.containerId = media.containerId
    }

    if (media.position) {
        dbMedia.position = media.position
    }

    return dbMedia
}
