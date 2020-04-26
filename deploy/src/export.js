"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utfBom = Buffer.from([0xef, 0xbb, 0xbf]);
const csvData = '';
function escape(str) {
    return `"${(str || '').replace(/"/g, '""')}"`;
}
exports.escape = escape;
exports.exportApi = express_1.Router().get('/export', (request, response, next) => {
    response.setHeader('Content-disposition', 'attachment; filename=export.csv');
    response.setHeader('Content-Type', 'text/csv; charset=utf-8');
    response.status(200);
    response.write(utfBom);
    response.write(csvData, 'utf-8');
    response.end();
});
//# sourceMappingURL=export.js.map