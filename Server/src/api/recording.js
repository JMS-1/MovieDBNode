"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const recording_1 = require("../database/recording");
exports.recordingApi = express_1.Router().use('/recording', express_1.Router()
    .get('/:id', (request, response, next) => utils_1.processApiRequest(async () => recording_1.toProtocol(await recording_1.recordingCollection.findOne(request.params.id)), request, response))
    .post('/search', (request, response, next) => utils_1.processApiRequest(async (req) => await recording_1.recordingCollection.query(req), request, response))
    .put('/:id', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const recording = recording_1.toEntity(req, request.params.id, undefined);
    return {
        recording: recording_1.toProtocol(recording),
        errors: await recording_1.recordingCollection.findOneAndReplace(recording),
    };
}, request, response)));

//# sourceMappingURL=recording.js.map
