"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("./utils");
const genre_1 = require("../database/genre");
exports.genreApi = express_1.Router().use('/genre', express_1.Router().get('/', (request, response, next) => utils_1.processApiRequest(async () => {
    const genres = await genre_1.genreCollection.find();
    return {
        genres: genres.map(genre_1.toProtocol),
    };
}, request, response)));

//# sourceMappingURL=genre.js.map
