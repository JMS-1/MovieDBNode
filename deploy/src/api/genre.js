"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const genre_1 = require("../database/genre");
exports.genreApi = utils_1.createApiRouter('/genre', genre_1.genreCollection, genre_1.toProtocol, genre_1.toEntity);

//# sourceMappingURL=genre.js.map
