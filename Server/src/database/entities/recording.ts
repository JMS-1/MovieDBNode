import { url } from 'inspector'

import { INewRecording, IRecording, IRecordingLink } from 'movie-db-api'

import { IObjectFieldSchema, ISchema, isoDate, uniqueId } from './utils'

export const collectionName = 'recordings'

export interface IDbLink extends IRecordingLink {}

export interface IDbRecording extends IRecording {}

const LinkSubSchema: IObjectFieldSchema<IDbLink> = {
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        url: {
            maxLength: 2000,
            message: 'Verweis ist zu lang',
            type: 'string',
        },
    },
    required: ['name', 'url'],
}

export const RecordingSchema: ISchema<IDbRecording> = {
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
            items: {
                message: 'Genre ist ungültig',
                pattern: uniqueId,
                type: 'string',
            },
            message: 'Genres sind ungültig',
            type: 'array',
            uniqueItems: true,
        },
        languages: {
            items: {
                message: 'Sprache ist ungültig',
                pattern: uniqueId,
                type: 'string',
            },
            message: 'Sprachen sind ungültig',
            type: 'array',
            uniqueItems: true,
        },
        links: {
            items: LinkSubSchema,
            message: 'Verweise sind ungültig',
            type: 'array',
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
    required: ['_id', 'name', 'created', 'media', 'genres', 'languages', 'links'],
}

function linkToProtocol(link: IDbLink): IRecordingLink {
    return link
}

function linkToEntity(link: IRecordingLink): IDbLink {
    const dbLink: IDbLink = {
        name: link.name,
        url: url.name,
    }

    if (link.description) {
        dbLink.description = link.description
    }

    return dbLink
}

export function toProtocol(recording: IDbRecording): IRecording {
    return { ...recording, links: (recording.links || []).map(linkToProtocol) }
}

export function toEntity(recording: INewRecording, id: string, created: string): IDbRecording {
    const dbRecording: IDbRecording = {
        _id: id,
        created,
        genres: recording.genres || [],
        languages: recording.languages || [],
        links: (recording.links || []).map(linkToEntity),
        media: recording.media,
        name: recording.name,
    }

    if (recording.description) {
        dbRecording.description = recording.description
    }

    if (recording.rentTo) {
        dbRecording.rentTo = recording.rentTo
    }

    if (recording.series) {
        dbRecording.series = recording.series
    }

    return dbRecording
}
