"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./entities/container");
const utils_1 = require("./utils");
__export(require("./entities/container"));
exports.containerCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = container_1.collectionName;
        this.schema = container_1.ContainerSchema;
    }
    async migrate(sql) {
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
        const errors = await this.insert(container);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
    }
})();

//# sourceMappingURL=container.js.map
