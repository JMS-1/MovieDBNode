"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionName = 'languages';
exports.LanguageSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/language.json',
    additionalProperties: false,
    type: 'object',
    message: { de: 'Sprache unvollständig' },
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
function toProtocol(language) {
    return language;
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
