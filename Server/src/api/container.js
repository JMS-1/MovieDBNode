"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const container_1 = require("../database/container");
exports.containerApi = express_1.Router().use('/container', express_1.Router().get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const containers = await container_1.containerCollection.query();
    return {
        containers: containers.map(container_1.toProtocol),
    };
}, request, response)));

//# sourceMappingURL=container.js.map
