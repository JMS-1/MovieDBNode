"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getVersion_1 = require("./getVersion");
const recording_1 = require("./recording");
function installApi(app) {
    const apiRoute = express_1.Router();
    apiRoute.use(getVersion_1.getVersion);
    apiRoute.use(recording_1.recordingApi);
    app.use('/api', apiRoute);
}
exports.installApi = installApi;

//# sourceMappingURL=index.js.map
