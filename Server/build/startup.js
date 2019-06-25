"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const path_1 = require("path");
const api_1 = require("./api");
const database_1 = require("./database");
const migration_1 = require("./database/migration");
const utils_1 = require("./utils");
async function startup() {
    await database_1.initializeDatabase();
    await migration_1.runMigration();
    const app = express();
    app.use(express.static(path_1.join(__dirname, '../dist')));
    api_1.installApi(app);
    app.listen(process.env.PORT);
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
