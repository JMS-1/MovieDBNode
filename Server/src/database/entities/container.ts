import { containerType, IContainer } from 'movie-db-api'

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
    [ContainerFields.type]: containerType
    [ContainerFields.description]?: string
    [ContainerFields.parentId]?: string
    [ContainerFields.parentLocation]?: string
}

export const ContainerSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/container.json',
    additionalProperties: false,
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
            enum: [
                containerType.Box,
                containerType.Disk,
                containerType.FeatureSet,
                containerType.Folder,
                containerType.Shelf,
                containerType.Undefined,
            ],
        },
    },
    required: [ContainerFields._id, ContainerFields.name, ContainerFields.type],
}

export function toProtocol(container: IDbContainer): IContainer {
    return {
        id: container[ContainerFields._id],
        description: container[ContainerFields.description] || undefined,
        name: container[ContainerFields.name],
        parentId: container[ContainerFields.parentId] || undefined,
        parentLocation: container[ContainerFields.parentLocation] || undefined,
        type: container[ContainerFields.type],
    }
}

export function toEntity(container: IContainer, id: string): IDbContainer {
    const dbContainer: IDbContainer = {
        [ContainerFields._id]: id,
        [ContainerFields.name]: container.name,
        [ContainerFields.type]: container.type,
    }

    if (container.description !== undefined) {
        dbContainer[ContainerFields.description] = container.description
    }

    if (container.parentId !== undefined) {
        dbContainer[ContainerFields.parentId] = container.parentId
    }

    if (container.parentLocation !== undefined) {
        dbContainer[ContainerFields.parentLocation] = container.parentLocation
    }

    return dbContainer
}
