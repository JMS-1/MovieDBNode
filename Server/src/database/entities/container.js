"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'containers';
exports.ContainerSchema = {
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
            pattern: utils_1.uniqueId,
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
                2,
                4,
                1,
                5,
                3,
                0,
            ],
        },
    },
    required: ['name', 'type'],
};
function toProtocol(container) {
    return container;
}
exports.toProtocol = toProtocol;
function toEntity(container, id) {
    const dbContainer = {
        _id: id,
        name: container.name,
        type: container.type,
    };
    if (container.description !== undefined) {
        dbContainer.description = container.description;
    }
    if (container.parentId !== undefined) {
        dbContainer.parentId = container.parentId;
    }
    if (container.parentLocation !== undefined) {
        dbContainer.parentLocation = container.parentLocation;
    }
    return dbContainer;
}
exports.toEntity = toEntity;

//# sourceMappingURL=container.js.map
