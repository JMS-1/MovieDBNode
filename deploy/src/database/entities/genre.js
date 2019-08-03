"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionName = 'genres';
exports.GenreSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/genre.json',
    additionalProperties: false,
    type: 'object',
    message: { de: 'Genre unvollständig' },
    properties: {
        _id: {
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: { de: 'Name nicht angegeben oder zu lang' },
            minLength: 1,
            type: 'string',
        },
    },
    required: ['name'],
};
function toProtocol(genre) {
    return genre;
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
