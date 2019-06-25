import { uniqueId } from './utils'

export const collectionName = 'series'

const enum SeriesFields {
    _id = '_id',
    name = 'name',
    description = 'description',
    parentId = 'parentId',
}

export interface IDbSeries {
    [SeriesFields._id]: string
    [SeriesFields.name]: string
    [SeriesFields.description]?: string
    [SeriesFields.parentId]?: string
}

export const SeriesSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/series.json',
    type: 'object',
    message: 'Serie unvollständig',
    properties: {
        [SeriesFields._id]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [SeriesFields.description]: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        [SeriesFields.name]: {
            maxLength: 50,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        [SeriesFields.parentId]: {
            message: 'Übergeordnete Serie ungültig',
            pattern: uniqueId,
            type: 'string',
        },
    },
    required: [SeriesFields._id, SeriesFields.name],
}
