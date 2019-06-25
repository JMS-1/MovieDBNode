"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const container_1 = require("./container");
const genre_1 = require("./genre");
const getSchemas_1 = require("./getSchemas");
const getVersion_1 = require("./getVersion");
const language_1 = require("./language");
const media_1 = require("./media");
const series_1 = require("./series");
function installApi(app) {
    const apiRoute = express_1.Router();
    apiRoute.use(container_1.containerApi);
    apiRoute.use(genre_1.genreApi);
    apiRoute.use(getSchemas_1.getSchema);
    apiRoute.use(getVersion_1.getVersion);
    apiRoute.use(language_1.languageApi);
    apiRoute.use(media_1.mediaApi);
    apiRoute.use(series_1.seriesApi);
    app.use('/api', apiRoute);
}
exports.installApi = installApi;

//# sourceMappingURL=index.js.map
