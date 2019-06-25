"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const language_1 = require("./entities/language");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
__export(require("./entities/language"));
exports.languageCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = language_1.collectionName;
        this.schema = language_1.LanguageSchema;
    }
    fromSql(sql) {
        const language = {
            _id: sql.Id,
            name: sql.Long || '',
        };
        const errors = validation_1.validate(language, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(language);
    }
})();
//# sourceMappingURL=language.js.map