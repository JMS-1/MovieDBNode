"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./entities/container");
__export(require("./entities/container"));
exports.containerCollection = new (class {
    constructor() {
        this.name = container_1.collectionName;
        this.schema = container_1.ContainerSchema;
    }
})();
//# sourceMappingURL=container.js.map