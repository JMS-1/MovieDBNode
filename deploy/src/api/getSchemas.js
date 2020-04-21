"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const recording_1 = require("../database/recording");
exports.getSchema = express_1.Router().get('/schemas', (request, response, next) => utils_1.processApiRequest(() => ({
    recording: recording_1.RecordingSchema,
}), request, response));

//# sourceMappingURL=getSchemas.js.map
