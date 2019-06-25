"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const recording_1 = require("../database/recording");
const utils_1 = require("../database/utils");
const validation_1 = require("../database/validation");
exports.linkCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = 'n/a';
        this.schema = recording_1.LinkSchema;
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
        const errors = validation_1.validate(link, this.schema);
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
