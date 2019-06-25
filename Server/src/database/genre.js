"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const genre_1 = require("./entities/genre");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
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
        const errors = validation_1.validate(genre, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(genre);
    }
})();
//# sourceMappingURL=genre.js.map