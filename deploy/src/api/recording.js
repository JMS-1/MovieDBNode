"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const recording_1 = require("../database/recording");
const utfBom = Buffer.from([0xef, 0xbb, 0xbf]);
const csvData = '';
function escape(str) {
    return `"${(str || '').replace(/"/g, '""')}"`;
}
exports.escape = escape;
exports.recordingApi = express_1.Router().use('/recording', express_1.Router()
    .get('/export', (request, response, next) => {
    response.setHeader('Content-disposition', 'attachment; filename=export.csv');
    response.setHeader('Content-Type', 'text/csv; charset=utf-8');
    response.status(200);
    response.write(utfBom);
    response.write(csvData, 'utf-8');
    response.end();
})
    .get('/:id', (request, response, next) => utils_1.processApiRequest(async () => recording_1.toProtocol(await recording_1.recordingCollection.findOne(request.params.id)), request, response))
    .get('/container/:id', (request, response, next) => utils_1.processApiRequest(async () => await recording_1.recordingCollection.queryContainer(request.params.id), request, response))
    .delete('/:id', (request, response) => utils_1.processApiRequest(async () => ({
    errors: await recording_1.recordingCollection.deleteOne(request.params.id),
    id: request.params.id,
}), request, response))
    .post('/search', (request, response, next) => utils_1.processApiRequest(async (req) => await recording_1.recordingCollection.query(req), request, response))
    .post('/export/query', (request, response, next) => utils_1.processApiRequest(async (req) => {
    return {};
}, request, response))
    .post('/', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const recording = recording_1.toEntity(req, uuid_1.v4(), new Date().toISOString());
    return {
        errors: await recording_1.recordingCollection.insertOne(recording),
        item: recording_1.toProtocol(recording),
    };
}, request, response))
    .put('/:id', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const recording = recording_1.toEntity(req, request.params.id, undefined);
    return {
        errors: await recording_1.recordingCollection.findOneAndReplace(recording),
        item: recording_1.toProtocol(recording),
    };
}, request, response)));

//# sourceMappingURL=recording.js.map
