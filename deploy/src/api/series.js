"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const series_1 = require("../database/series");
exports.seriesApi = utils_1.createApiRouter('/series', series_1.seriesCollection, series_1.toProtocol, series_1.toEntity);
//# sourceMappingURL=series.js.map