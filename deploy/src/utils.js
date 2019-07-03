"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
exports.apiError = debug('api');
function getError(error) {
    return typeof error === 'string' ? error : error.message || 'failed';
}
exports.getError = getError;

//# sourceMappingURL=utils.js.map
