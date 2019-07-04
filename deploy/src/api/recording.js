"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const genre_1 = require("../database/genre");
const language_1 = require("../database/language");
const recording_1 = require("../database/recording");
let csvData = '';
function escape(str) {
    return `"${(str || '').replace(/"/g, '""')}"`;
}
exports.recordingApi = express_1.Router().use('/recording', express_1.Router()
    .get('/export', (request, response, next) => {
    response.setHeader('Content-disposition', 'attachment; filename=export.csv');
    response.setHeader('Content-Type', 'text/csv');
    response.status(200);
    response.write(csvData);
    response.end();
})
    .get('/:id', (request, response, next) => utils_1.processApiRequest(async () => recording_1.toProtocol(await recording_1.recordingCollection.findOne(request.params.id)), request, response))
    .get('/container/:id', (request, response, next) => utils_1.processApiRequest(async () => await recording_1.recordingCollection.queryContainer(request.params.id), request, response))
    .delete('/:id', (request, response) => utils_1.processApiRequest(async () => ({
    id: request.params.id,
    errors: await recording_1.recordingCollection.deleteOne(request.params.id),
}), request, response))
    .post('/search', (request, response, next) => utils_1.processApiRequest(async (req) => await recording_1.recordingCollection.query(req), request, response))
    .post('/export/query', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const all = await recording_1.recordingCollection.query(req);
    const languageMap = {};
    const languages = await language_1.languageCollection.find();
    languages.forEach(l => (languageMap[l._id] = l.name));
    const genreMap = {};
    const genres = await genre_1.genreCollection.find();
    genres.forEach(g => (genreMap[g._id] = g.name));
    csvData = 'Name;Sprachen;Kategorien\r\n';
    for (let recording of all.list) {
        const name = escape(recording.fullName);
        const languages = escape((recording.languages || []).map(l => languageMap[l] || l).join('; '));
        const genres = escape((recording.genres || []).map(l => genreMap[l] || l).join('; '));
        csvData += `${name};${languages};${genres}\r\n`;
    }
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
