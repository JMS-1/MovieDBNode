import { containerType, IContainer, INewContainer } from 'movie-db-api'

import { uniqueId } from './utils'

export const collectionName = 'containers'

export interface IDbContainer {
    _id: string
    name: string
    type: containerType
    description?: string
    parentId?: string
    parentLocation?: string
}

export const ContainerSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/container.json',
    additionalProperties: false,
    type: 'object',
    message: 'Ablage unvollständig',
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
            message: 'Übergeordnete Ablage ungültig',
            pattern: uniqueId,
            type: 'string',
        },
        parentLocation: {
            maxLength: 100,
            message: 'Ablagebezeichnung zu lang',
            type: 'string',
        },
        type: {
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
    required: ['_id', 'name', 'type'],
}

export function toProtocol(container: IDbContainer): IContainer {
    return {
        id: container._id,
        description: container.description || undefined,
        name: container.name,
        parentId: container.parentId || undefined,
        parentLocation: container.parentLocation || undefined,
        type: container.type,
    }
}

export function toEntity(container: INewContainer, id: string): IDbContainer {
    const dbContainer: IDbContainer = {
        _id: id,
        name: container.name,
        type: container.type,
    }

    if (container.description !== undefined) {
        dbContainer.description = container.description
    }

    if (container.parentId !== undefined) {
        dbContainer.parentId = container.parentId
    }

    if (container.parentLocation !== undefined) {
        dbContainer.parentLocation = container.parentLocation
    }

    return dbContainer
}
