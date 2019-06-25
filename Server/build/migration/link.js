"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../database/entities/utils");
const validation_1 = require("../database/validation");
exports.LinkSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/link.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        ["from"]: {
            message: 'Quellkennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        ["to"]: {
            message: 'Zielkennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
    },
    required: ["from", "to"],
};
class LinkCollection {
    constructor(_other) {
        this._other = _other;
        this._migrated = [];
    }
    fromSql(sql) {
        const link = {
            from: sql.Recording,
            to: sql[this._other],
        };
        const errors = validation_1.validate(link, exports.LinkSchema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this._migrated.push(link);
    }
}
exports.LinkCollection = LinkCollection;

//# sourceMappingURL=link.js.map
