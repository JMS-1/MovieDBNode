"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueIdPattern = void 0;
const hex = '[0-9a-fA-F]';
exports.uniqueIdPattern = `^${hex}{8}-(${hex}{4}-){3}${hex}{12}$`;

//# sourceMappingURL=utils.js.map
