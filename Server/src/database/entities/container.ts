import { ISchema, uniqueId } from '@jms-1/isxs-validation'

import { containerType, IContainer, INewContainer } from 'movie-db-api'

export const collectionName = 'containers'

export interface IDbContainer extends IContainer {}

export const ContainerSchema: ISchema<IContainer> = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/container.json',
    additionalProperties: false,
    type: 'object',
    message: 'Ablage unvollständig',
    properties: {
        _id: {
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
    required: ['name', 'type'],
}

export function toProtocol(container: IDbContainer): IContainer {
    return container
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
