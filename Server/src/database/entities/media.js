"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'medias';
exports.MediaSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/media.json',
    additionalProperties: false,
    type: 'object',
    message: 'Medium unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        containerId: {
            message: 'Ablage ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        position: {
            maxLength: 100,
            message: 'Standort zu lang',
            type: 'string',
        },
        type: {
            message: 'Medienart fehlt oder ist unzulässig',
            type: 'integer',
            enum: [
                5,
                4,
                3,
                2,
                0,
                1,
            ],
        },
    },
    required: ['_id', 'type'],
};
function toProtocol(media) {
    return media;
}
exports.toProtocol = toProtocol;
function toEntity(media, id) {
    const dbMedia = {
        _id: id,
        type: media.type,
    };
    if (media.containerId) {
        dbMedia.containerId = media.containerId;
    }
    if (media.position) {
        dbMedia.position = media.position;
    }
    return dbMedia;
}
exports.toEntity = toEntity;

//# sourceMappingURL=media.js.map
