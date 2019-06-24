"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getSchemas_1 = require("./getSchemas");
const getVersion_1 = require("./getVersion");
function installApi(app) {
    app.use(getSchemas_1.getSchema);
    app.use(getVersion_1.getVersion);
}
exports.installApi = installApi;

//# sourceMappingURL=index.js.map
