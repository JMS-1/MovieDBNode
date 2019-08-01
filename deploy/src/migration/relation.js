"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
exports.RelationSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/relation.json',
    additionalProperties: false,
    type: 'object',
    message: 'Verweis unvollständig',
    properties: {
        from: {
            message: 'Quellkennung fehlt oder ist ungültig',
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
        to: {
            message: 'Zielkennung fehlt oder ist ungültig',
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
    },
    required: ['from', 'to'],
};
class RelationCollection {
    constructor(_other) {
        this._other = _other;
        this.migrated = [];
    }
    fromSql(sql) {
        const relation = {
            from: sql.Recording,
            to: sql[this._other],
        };
        const errors = isxs_validation_1.validate(relation, exports.RelationSchema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.migrated.push(relation);
    }
    migrate() {
        return Promise.resolve(undefined);
    }
}
exports.RelationCollection = RelationCollection;

//# sourceMappingURL=relation.js.map
