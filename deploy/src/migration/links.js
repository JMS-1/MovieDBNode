"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
const uuid_1 = require("uuid");
exports.MigrateLinkSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/link.json',
    additionalProperties: false,
    type: 'object',
    message: { de: 'Verweis unvollständig' },
    properties: {
        _id: {
            message: { de: 'Eindeutige Kennung fehlt oder ist ungültig' },
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
        description: {
            maxLength: 2000,
            message: { de: 'Beschreibung ist zu lang' },
            type: 'string',
        },
        for: {
            message: { de: 'Aufzeichnungskennung fehlt oder ist ungültig' },
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
        name: {
            maxLength: 100,
            message: { de: 'Name nicht angegeben oder zu lang' },
            minLength: 1,
            type: 'string',
        },
        ordinal: {
            message: { de: 'Anordnung fehlt oder ist ungültig' },
            minimum: 0,
            type: 'integer',
        },
        url: {
            maxLength: 2000,
            message: { de: 'Verweis ist zu lang' },
            type: 'string',
        },
    },
    required: ['_id', 'name', 'for', 'url', 'ordinal'],
};
exports.linkCollection = new (class {
    cacheMigrated(item) {
        if (this.migrationMap[item._id]) {
            throw new Error(`duplicated identifier '${item._id}`);
        }
        this.migrationMap[item._id] = item;
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
        const errors = isxs_validation_1.validate(link, exports.MigrateLinkSchema);
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
