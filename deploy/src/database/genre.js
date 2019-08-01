"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
const genre_1 = require("./entities/genre");
const recording_1 = require("./recording");
const utils_1 = require("./utils");
__export(require("./entities/genre"));
exports.genreCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = genre_1.collectionName;
        this.schema = genre_1.GenreSchema;
    }
    fromSql(sql) {
        const genre = {
            _id: sql.Id,
            name: sql.Long || '',
        };
        const errors = isxs_validation_1.validate(genre, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(genre);
    }
    async canDelete(id) {
        return recording_1.recordingCollection.inUse('genres', id, 'Kategorie');
    }
})();

//# sourceMappingURL=genre.js.map
