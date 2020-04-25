"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
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
    .post('/export/query', (request, response, next) => utils_1.processApiRequest(async (req) => {
    return {};
}, request, response)));

//# sourceMappingURL=recording.js.map
