"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const recording_1 = require("./entities/recording");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
__export(require("./entities/recording"));
const dateReg = /^CAST\(N'([^\.]+)(\.\d+)?' AS DateTime\)$/;
exports.recordingCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = recording_1.collectionName;
        this.schema = recording_1.RecordingSchema;
    }
    fromSql(sql) {
        const date = dateReg.exec(sql.Created);
        const recording = {
            _id: sql.Id,
            created: (date && `${date[1]}Z`) || sql.Created,
            genres: [],
            languages: [],
            media: sql.Media,
            name: sql.Name,
        };
        if (sql.Description) {
            recording.description = sql.Description;
        }
        if (sql.RentTo) {
            recording.rentTo = sql.RentTo;
        }
        if (sql.Series) {
            recording.series = sql.Series;
        }
        const errors = validation_1.validate(recording, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(recording);
    }
})();

//# sourceMappingURL=recording.js.map
