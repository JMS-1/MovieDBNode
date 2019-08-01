"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
exports.collectionName = 'series';
exports.SeriesSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/series.json',
    additionalProperties: false,
    type: 'object',
    message: 'Serie unvollständig',
    properties: {
        _id: {
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        fullName: {
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
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
    },
    required: ['name'],
};
function toProtocol(series) {
    return series;
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
