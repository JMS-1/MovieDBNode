"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const container_1 = require("../database/container");
exports.containerApi = express_1.Router().use('/container', express_1.Router()
    .get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const containers = await container_1.containerCollection.find();
    return {
        containers: containers.map(container_1.toProtocol),
    };
}, request, response))
    .put('/:id', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const container = container_1.toEntity(req, request.params.id);
    return {
        container: container_1.toProtocol(container),
        errors: await container_1.containerCollection.findOneAndReplace(container),
    };
}, request, response))
    .post('/', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const container = container_1.toEntity(req, uuid_1.v4());
    return {
        container: container_1.toProtocol(container),
        errors: await container_1.containerCollection.insertOne(container),
    };
}, request, response)));

//# sourceMappingURL=container.js.map
