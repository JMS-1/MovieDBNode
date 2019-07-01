"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const series_1 = require("../database/series");
exports.seriesApi = express_1.Router().use('/series', express_1.Router()
    .get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const series = await series_1.seriesCollection.find();
    return {
        series: series.map(series_1.toProtocol),
    };
}, request, response))
    .put('/:id', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const series = series_1.toEntity(req, request.params.id);
    return {
        series: series_1.toProtocol(series),
        errors: await series_1.seriesCollection.findOneAndReplace(series),
    };
}, request, response))
    .post('/', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const series = series_1.toEntity(req, uuid_1.v4());
    return {
        series: series_1.toProtocol(series),
        errors: await series_1.seriesCollection.insertOne(series),
    };
}, request, response)));

//# sourceMappingURL=series.js.map
