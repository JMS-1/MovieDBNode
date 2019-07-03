"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const container_1 = require("../database/entities/container");
const genre_1 = require("../database/genre");
const language_1 = require("../database/language");
const recording_1 = require("../database/recording");
const series_1 = require("../database/series");
exports.getSchema = express_1.Router().get('/schemas', (request, response, next) => utils_1.processApiRequest(() => ({
    container: container_1.ContainerSchema,
    genre: genre_1.GenreSchema,
    language: language_1.LanguageSchema,
    recording: recording_1.RecordingSchema,
    series: series_1.SeriesSchema,
}), request, response));

//# sourceMappingURL=getSchemas.js.map
