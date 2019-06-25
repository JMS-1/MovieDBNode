"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'series';
exports.SeriesSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/series.json',
    additionalProperties: false,
    type: 'object',
    message: 'Serie unvollständig',
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
        name: {
            maxLength: 50,
            message: 'Name nicht angegeben oder zu lang',
            minLength: 1,
            type: 'string',
        },
        parentId: {
            message: 'Übergeordnete Serie ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
    },
    required: ['_id', 'name'],
};
function toProtocol(series) {
    return {
        _id: series._id,
        description: series.description || undefined,
        name: series.name,
        parentId: series.parentId || undefined,
    };
}
exports.toProtocol = toProtocol;
function toEntity(series, id) {
    const dbSeries = {
        _id: id,
        name: series.name,
    };
    if (series.description) {
        dbSeries.description = series.description;
    }
    if (series.parentId) {
        dbSeries.parentId = series.parentId;
    }
    return dbSeries;
}
exports.toEntity = toEntity;

//# sourceMappingURL=series.js.map
