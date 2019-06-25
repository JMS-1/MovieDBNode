"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const genre_1 = require("./genre");
const language_1 = require("./language");
const media_1 = require("./media");
const schema_1 = require("./schema");
const series_1 = require("./series");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
async function initializeDatabase() {
    const db = await utils_1.dbConnect();
    const collections = [container_1.containerCollection, series_1.seriesCollection, genre_1.genreCollection, language_1.languageCollection, media_1.mediaCollection];
    for (let { schema, name } of collections) {
        validation_1.addSchema(schema);
        await db.createCollection(name);
        await db.command({ collMod: name, validator: { $jsonSchema: schema_1.convertToMongo(schema) } });
    }
}
exports.initializeDatabase = initializeDatabase;

//# sourceMappingURL=index.js.map
