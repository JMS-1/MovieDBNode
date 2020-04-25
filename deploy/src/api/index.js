"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recording_1 = require("./recording");
function installApi(app) {
    const apiRoute = express_1.Router();
    apiRoute.use(recording_1.recordingApi);
    app.use('/api', apiRoute);
}
exports.installApi = installApi;

//# sourceMappingURL=index.js.map
