"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
const container_1 = require("./entities/container");
const recording_1 = require("./recording");
const utils_1 = require("./utils");
__export(require("./entities/container"));
exports.containerCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = container_1.collectionName;
        this.schema = container_1.ContainerSchema;
    }
    fromSql(sql) {
        const container = {
            _id: sql.Id,
            name: sql.Name || '',
            type: parseInt(sql.Type, 10),
        };
        if (sql.Description) {
            container.description = sql.Description;
        }
        if (sql.Parent) {
            container.parentId = sql.Parent;
        }
        if (sql.ParentLocation) {
            container.parentLocation = sql.ParentLocation;
        }
        const errors = isxs_validation_1.validate(container, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(container);
    }
    async canDelete(id) {
        return recording_1.recordingCollection.inUse('containerId', id, 'Ablage');
    }
    async postDelete(id) {
        const me = await this.getCollection();
        await me.updateMany({ parentId: typeof id === 'string' && id }, { $unset: { parentId: null } });
    }
})();

//# sourceMappingURL=container.js.map
