"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const container_1 = require("../database/entities/container");
exports.getSchema = express_1.Router().get('/schemas', (request, response, next) => utils_1.processApiRequest(() => ({ container: container_1.ContainerSchema }), request, response));
//# sourceMappingURL=getSchemas.js.map