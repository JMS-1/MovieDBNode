import { ISchema, uniqueId } from '@jms-1/isxs-validation'

import { containerType, IContainer, INewContainer } from 'movie-db-api'

export const collectionName = 'containers'

export interface IDbContainer extends IContainer {}

export const ContainerSchema: ISchema<IContainer> = {
    $id: 'http://psimarron.net/schemas/movie-db/container.json',
    $schema: 'http://json-schema.org/schema#',
    additionalProperties: false,
    message: { de: 'Ablage unvollständig' },
    properties: {
        _id: {
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: { de: 'Beschreibung ist zu lang' },
            type: 'string',
        },
        name: {
            maxLength: 50,
            message: { de: 'Name nicht angegeben oder zu lang' },
            minLength: 1,
            type: 'string',
        },
        parentId: {
            message: { de: 'Übergeordnete Ablage ungültig' },
            pattern: uniqueId,
            type: 'string',
        },
        parentLocation: {
            maxLength: 100,
            message: { de: 'Ablagebezeichnung zu lang' },
            type: 'string',
        },
        type: {
            enum: [
                containerType.Box,
                containerType.Disk,
                containerType.FeatureSet,
                containerType.Folder,
                containerType.Shelf,
                containerType.Undefined,
            ],
            message: { de: 'Ablageart fehlt oder ist unzulässig' },
            type: 'integer',
        },
    },
    required: ['name', 'type'],
    type: 'object',
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
