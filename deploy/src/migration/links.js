"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
const uuid_1 = require("uuid");
const utils_1 = require("../database/utils");
const MigrateLinkSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/link.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: 'Beschreibung ist zu lang',
            type: 'string',
        },
        for: {
            message: 'Aufzeichnungskennung fehlt oder ist ungültig',
            pattern: isxs_validation_1.uniqueId,
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
exports.linkCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = 'n/a';
        this.schema = MigrateLinkSchema;
    }
    fromSql(sql) {
        const link = {
            _id: uuid_1.v4(),
            for: sql.For,
            name: sql.Name || '',
            ordinal: parseInt(sql.Ordinal, 10),
            url: sql.Url,
        };
        if (sql.Description) {
            link.description = sql.Description;
        }
        const errors = isxs_validation_1.validate(link, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(link);
    }
    migrate() {
        return Promise.resolve(undefined);
    }
})();

//# sourceMappingURL=links.js.map
