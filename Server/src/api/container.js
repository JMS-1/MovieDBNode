"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const container_1 = require("../database/container");
exports.containerApi = utils_1.createApiRouter('/container', container_1.containerCollection, container_1.toProtocol, container_1.toEntity);

//# sourceMappingURL=container.js.map
