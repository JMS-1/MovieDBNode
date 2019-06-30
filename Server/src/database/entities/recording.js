"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'recordings';
const LinkSubSchema = {
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        url: {
            maxLength: 2000,
            message: 'Verweis ist zu lang',
            type: 'string',
        },
    },
    required: ['name', 'url'],
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
            items: {
                message: 'Sprache ist ungültig',
                pattern: utils_1.uniqueId,
                type: 'string',
            },
            message: 'Sprachen sind ungültig',
            type: 'array',
            uniqueItems: true,
        },
        links: {
            items: LinkSubSchema,
            message: 'Verweise sind ungültig',
            type: 'array',
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
        containerId: {
            message: 'Ablage ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        containerPosition: {
            maxLength: 100,
            message: 'Standort zu lang',
            type: 'string',
        },
        containerType: {
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
    required: ['_id', 'name', 'created', 'genres', 'languages', 'links', 'containerType'],
};
function linkToProtocol(link) {
    return link;
}
function linkToEntity(link) {
    const dbLink = {
        name: link.name,
        url: link.url,
    };
    if (link.description) {
        dbLink.description = link.description;
    }
    return dbLink;
}
function toProtocol(recording) {
    return Object.assign({}, recording, { links: (recording.links || []).map(linkToProtocol) });
}
exports.toProtocol = toProtocol;
function toEntity(recording, id, created) {
    const dbRecording = {
        _id: id,
        containerType: recording.containerType,
        created,
        genres: recording.genres || [],
        languages: recording.languages || [],
        links: (recording.links || []).map(linkToEntity),
        name: recording.name,
    };
    if (recording.description) {
        dbRecording.description = recording.description;
    }
    if (recording.containerId) {
        dbRecording.containerId = recording.containerId;
    }
    if (recording.containerPosition) {
        dbRecording.containerPosition = recording.containerPosition;
    }
    if (recording.rentTo) {
        dbRecording.rentTo = recording.rentTo;
    }
    if (recording.series) {
        dbRecording.series = recording.series;
    }
    return dbRecording;
}
exports.toEntity = toEntity;

//# sourceMappingURL=recording.js.map
