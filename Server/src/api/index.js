"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("./container");
const getSchemas_1 = require("./getSchemas");
const getVersion_1 = require("./getVersion");
function installApi(app) {
    const apiRoute = express_1.Router();
    apiRoute.use(getSchemas_1.getSchema);
    apiRoute.use(getVersion_1.getVersion);
    apiRoute.use(container_1.containerApi);
    app.use('/api', apiRoute);
}
exports.installApi = installApi;
//# sourceMappingURL=index.js.map