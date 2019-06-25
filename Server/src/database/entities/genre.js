"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'genres';
exports.GenreSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/genre.json',
    additionalProperties: false,
    type: 'object',
    message: 'Genre unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
    },
    required: ['_id', 'name'],
};
function toProtocol(genre) {
    return {
        _id: genre._id,
        name: genre.name,
    };
}
exports.toProtocol = toProtocol;
function toEntity(container, id) {
    const dbGenre = {
        _id: id,
        name: container.name,
    };
    return dbGenre;
}
exports.toEntity = toEntity;

//# sourceMappingURL=genre.js.map
