"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
exports.collectionName = 'containers';
exports.ContainerSchema = {
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
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
        parentLocation: {
            maxLength: 100,
            message: { de: 'Ablagebezeichnung zu lang' },
            type: 'string',
        },
        type: {
            enum: [
                2,
                4,
                1,
                5,
                3,
                0,
            ],
            message: { de: 'Ablageart fehlt oder ist unzulässig' },
            type: 'integer',
        },
    },
    required: ['name', 'type'],
    type: 'object',
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
