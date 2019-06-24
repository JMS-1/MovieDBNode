import { uniqueId } from './utils'

export const collectionName = 'containers'

const enum ContainerFields {
    _id = '_id',
    name = 'name',
    type = 'type',
    description = 'description',
    parentId = 'parentId',
    parentLocation = 'parentLocation',
}

export interface IDbContainer {
    [ContainerFields._id]: string
    [ContainerFields.name]: string
    [ContainerFields.type]: number
    [ContainerFields.description]?: string
    [ContainerFields.parentId]?: string
    [ContainerFields.parentLocation]?: string
}

export const ContainerSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/container.json',
    type: 'object',
    message: 'Ablage unvollständig',
    properties: {
        [ContainerFields._id]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [ContainerFields.description]: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        [ContainerFields.name]: {
            maxLength: 50,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        [ContainerFields.parentId]: {
            message: 'Übergeordnete Ablage ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        [ContainerFields.parentLocation]: {
            maxLength: 100,
            message: 'Ablagebezeichnung zu lang',
            type: 'string',
        },
        [ContainerFields.type]: {
            message: 'Ablageart fehlt oder ist unzulässig',
            type: 'integer',
        },
    },
    required: [[ContainerFields._id], [ContainerFields.name], [ContainerFields.type]],
}
