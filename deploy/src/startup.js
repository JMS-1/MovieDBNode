"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const debug = require("debug");
const express = require("express");
const path_1 = require("path");
const api_1 = require("./api");
const config_1 = require("./config");
const database_1 = require("./database");
const utils_1 = require("./utils");
async function startup() {
    await database_1.initializeDatabase();
    const app = express();
    app.use(express.static(path_1.join(__dirname, '../dist')));
    app.use(body_parser_1.json());
    api_1.installApi(app);
    app.listen(config_1.Config.port);
}
function startupError(error) {
    debug('startup')('%s', utils_1.getError(error));
}
try {
    startup()
        .then(undefined, startupError)
        .catch(startupError);
}
catch (error) {
    startupError(error);
}

//# sourceMappingURL=startup.js.map
