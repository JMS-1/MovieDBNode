"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'containers';
exports.ContainerSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/container.json',
    type: 'object',
    message: 'Ablage unvollständig',
    properties: {
        ["_id"]: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        ["description"]: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        ["name"]: {
            maxLength: 50,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        ["parentId"]: {
            message: 'Übergeordnete Ablage ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        ["parentLocation"]: {
            maxLength: 100,
            message: 'Ablagebezeichnung zu lang',
            type: 'string',
        },
        ["type"]: {
            message: 'Ablageart fehlt oder ist unzulässig',
            type: 'integer',
        },
    },
    required: ["_id", "name", "type"],
};
//# sourceMappingURL=container.js.map