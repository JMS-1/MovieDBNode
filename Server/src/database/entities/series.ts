import { ISchema, uniqueId } from '@jms-1/isxs-validation'

import { INewSeries, ISeries } from 'movie-db-api'

export const collectionName = 'series'

export interface IDbSeries extends ISeries {}

export const SeriesSchema: ISchema<ISeries> = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/series.json',
    additionalProperties: false,
    type: 'object',
    message: 'Serie unvollständig',
    properties: {
        _id: {
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        fullName: {
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
    required: ['name'],
}

export function toProtocol(series: IDbSeries): ISeries {
    return series
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
