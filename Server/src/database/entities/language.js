"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.collectionName = 'languages';
exports.LanguageSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/language.json',
    additionalProperties: false,
    type: 'object',
    message: 'Sprache unvollständig',
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
function toProtocol(language) {
    return {
        _id: language._id,
        name: language.name,
    };
}
exports.toProtocol = toProtocol;
function toEntity(language, id) {
    const dbLanguage = {
        _id: id,
        name: language.name,
    };
    return dbLanguage;
}
exports.toEntity = toEntity;

//# sourceMappingURL=language.js.map
