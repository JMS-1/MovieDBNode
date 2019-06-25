"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./entities/container");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
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
        const errors = validation_1.validate(container, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(container);
    }
})();

//# sourceMappingURL=container.js.map
