"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
exports.MigrateMediaSchema = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'http://psimarron.net/schemas/movie-db/migrate/media.json',
    additionalProperties: false,
    type: 'object',
    message: { de: 'Medium unvollständig' },
    properties: {
        _id: {
            message: { de: 'Eindeutige Kennung fehlt oder ist ungültig' },
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
        containerId: {
            message: { de: 'Ablage ist ungültig' },
            pattern: isxs_validation_1.uniqueId,
            type: 'string',
        },
        position: {
            maxLength: 100,
            message: { de: 'Standort zu lang' },
            type: 'string',
        },
        type: {
            message: { de: 'Medienart fehlt oder ist unzulässig' },
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
exports.mediaCollection = new (class {
    cacheMigrated(item) {
        if (this.migrationMap[item._id]) {
            throw new Error(`duplicated identifier '${item._id}`);
        }
        this.migrationMap[item._id] = item;
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
        const errors = isxs_validation_1.validate(media, exports.MigrateMediaSchema);
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
