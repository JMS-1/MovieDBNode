"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const genre_1 = require("./genre");
const language_1 = require("./language");
const recording_1 = require("./recording");
const series_1 = require("./series");
const utils_1 = require("./utils");
async function initializeDatabase() {
    const collections = [
        container_1.containerCollection,
        genre_1.genreCollection,
        language_1.languageCollection,
        recording_1.recordingCollection,
        series_1.seriesCollection,
    ];
    const db = await utils_1.dbConnect();
    for (let collection of collections) {
        const dbCollection = await db.createCollection(collection.name);
        await collection.initialize(dbCollection, db);
    }
}
exports.initializeDatabase = initializeDatabase;

//# sourceMappingURL=index.js.map
