"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../database/entities/utils");
const utils_2 = require("../database/utils");
const validation_1 = require("../database/validation");
const MigrateMediaSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/media.json',
    additionalProperties: false,
    type: 'object',
    message: 'Medium unvollständig',
    properties: {
        _id: {
            message: 'Eindeutige Kennung fehlt oder ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        containerId: {
            message: 'Ablage ist ungültig',
            pattern: utils_1.uniqueId,
            type: 'string',
        },
        position: {
            maxLength: 100,
            message: 'Standort zu lang',
            type: 'string',
        },
        type: {
            message: 'Medienart fehlt oder ist unzulässig',
            type: 'integer',
            enum: [
                5,
                4,
                3,
                2,
                0,
                1,
            ],
        },
    },
    required: ['_id', 'type'],
};
exports.mediaCollection = new (class extends utils_2.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = 'n/a';
        this.schema = MigrateMediaSchema;
    }
    fromSql(sql) {
        const media = {
            _id: sql.Id,
            type: parseInt(sql.Type, 10),
        };
        if (sql.Container) {
            media.containerId = sql.Container;
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
    migrate() {
        return Promise.resolve(undefined);
    }
})();

//# sourceMappingURL=media.js.map
