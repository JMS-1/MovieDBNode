"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const series_1 = require("./entities/series");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
__export(require("./entities/series"));
exports.seriesCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = series_1.collectionName;
        this.schema = series_1.SeriesSchema;
    }
    fromSql(sql) {
        const series = {
            _id: sql.Id,
            name: sql.Name || '',
        };
        if (sql.Description) {
            series.description = sql.Description;
        }
        if (sql.Parent) {
            series.parentId = sql.Parent;
        }
        const errors = validation_1.validate(series, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(series);
    }
})();
//# sourceMappingURL=series.js.map