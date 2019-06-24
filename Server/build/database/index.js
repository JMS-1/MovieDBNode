"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./entities/container");
const validation_1 = require("./validation");
async function initializeDatabase() {
    validation_1.addSchema(container_1.ContainerSchema);
}
exports.initializeDatabase = initializeDatabase;

//# sourceMappingURL=index.js.map
