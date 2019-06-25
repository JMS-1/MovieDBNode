"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const series_1 = require("../database/series");
exports.seriesApi = express_1.Router().use('/series', express_1.Router().get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const series = await series_1.seriesCollection.query();
    return {
        series: series.map(series_1.toProtocol),
    };
}, request, response)));

//# sourceMappingURL=series.js.map
