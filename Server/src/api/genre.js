"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
const genre_1 = require("../database/genre");
exports.genreApi = express_1.Router().use('/genre', express_1.Router()
    .get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const genres = await genre_1.genreCollection.find();
    return {
        genres: genres.map(genre_1.toProtocol),
    };
}, request, response))
    .put('/:id', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const genre = genre_1.toEntity(req, request.params.id);
    return {
        genre: genre_1.toProtocol(genre),
        errors: await genre_1.genreCollection.findOneAndReplace(genre),
    };
}, request, response))
    .post('/', (request, response, next) => utils_1.processApiRequest(async (req) => {
    const genre = genre_1.toEntity(req, uuid_1.v4());
    return {
        genre: genre_1.toProtocol(genre),
        errors: await genre_1.genreCollection.insertOne(genre),
    };
}, request, response)));

//# sourceMappingURL=genre.js.map
