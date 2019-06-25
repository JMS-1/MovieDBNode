import { INewSeries, ISeries } from 'movie-db-api'

import { uniqueId } from './utils'

export const collectionName = 'series'

export interface IDbSeries {
    _id: string
    name: string
    description?: string
    parentId?: string
}

export const SeriesSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/series.json',
    additionalProperties: false,
    type: 'object',
    message: 'Serie unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        name: {
            maxLength: 50,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        parentId: {
            message: 'Übergeordnete Serie ungültig',
            pattern: uniqueId,
            type: 'string',
        },
    },
    required: ['_id', 'name'],
}

export function toProtocol(series: IDbSeries): ISeries {
    return {
        _id: series._id,
        description: series.description || undefined,
        name: series.name,
        parentId: series.parentId || undefined,
    }
}

export function toEntity(series: INewSeries, id: string): IDbSeries {
    const dbSeries: IDbSeries = {
        _id: id,
        name: series.name,
    }

    if (series.description) {
        dbSeries.description = series.description
    }

    if (series.parentId) {
        dbSeries.parentId = series.parentId
    }

    return dbSeries
}
