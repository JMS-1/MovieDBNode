"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'recordings';
exports.LinkSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/link.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        for: {
            message: 'Aufzeichnungskennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        ordinal: {
            message: 'Anordnung fehlt oder ist ungültig',
            minimum: 0,
            type: 'integer',
        },
        url: {
            maxLength: 2000,
            message: 'Verweis ist zu lang',
            type: 'string',
        },
    },
    required: ['_id', 'name', 'for', 'url', 'ordinal'],
};
exports.RecordingSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/recording.json',
    additionalProperties: false,
    type: 'object',
    message: 'Aufzeichnung unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        created: {
            message: 'Zeitpunkt fehlt oder ist ungültig',
            pattern: utils_1.isoDate,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        genres: {
            items: {
                message: 'Genre ist ungültig',
                pattern: utils_1.uniqueId,
                type: 'string',
            },
            message: 'Genres sind ungültig',
            type: 'array',
            uniqueItems: true,
        },
        languages: {
            items: { message: 'Sprache ist ungültig', pattern: utils_1.uniqueId, type: 'string' },
            message: 'Sprachen sind ungültig',
            type: 'array',
            uniqueItems: true,
        },
        links: {
            message: 'Verweise sind ungültig',
            type: 'array',
            items: {
                type: exports.LinkSchema.type,
                message: exports.LinkSchema.message,
                properties: {
                    description: exports.LinkSchema.properties.description,
                    name: exports.LinkSchema.properties.name,
                    url: exports.LinkSchema.properties.url,
                },
                required: ['name', 'url'],
            },
        },
        media: {
            message: 'Medium fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 200,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        rentTo: {
            maxLength: 200,
            message: 'Verleiher zu lang',
            type: 'string',
        },
        series: {
            message: 'Serie ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
    },
    required: ['_id', 'name', 'created', 'media', 'genres', 'languages', 'links'],
};

//# sourceMappingURL=recording.js.map
