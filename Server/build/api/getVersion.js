"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
exports.getVersion = express_1.Router().get('/version', (request, response, next) => utils_1.processApiRequest(() => ({ version: '0.1' }), request, response));
//# sourceMappingURL=getVersion.js.map