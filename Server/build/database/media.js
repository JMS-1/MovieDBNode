"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const media_1 = require("./entities/media");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
__export(require("./entities/media"));
exports.mediaCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = media_1.collectionName;
        this.schema = media_1.MediaSchema;
    }
    fromSql(sql) {
        const media = {
            _id: sql.Id,
            type: parseInt(sql.Type, 10),
        };
        if (sql.Container) {
            media.container = sql.Container;
        }
        if (sql.Position) {
            media.position = sql.Position;
        }
        const errors = validation_1.validate(media, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(media);
    }
})();

//# sourceMappingURL=media.js.map
