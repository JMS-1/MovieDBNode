"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.apiError = void 0;
const debug_1 = __importDefault(require("debug"));
exports.apiError = (0, debug_1.default)('api');
function getMessage(error, defaultMessage = 'failed') {
    return ((typeof error === 'string' ? error : error && `${error.message}`) || '').trim() || defaultMessage;
}
exports.getMessage = getMessage;
//# sourceMappingURL=utils.js.map