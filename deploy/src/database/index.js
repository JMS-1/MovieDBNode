"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recording_1 = require("./recording");
const utils_1 = require("./utils");
async function initializeDatabase() {
    const collections = [recording_1.recordingCollection];
    const db = await utils_1.dbConnect();
    for (const collection of collections) {
        const dbCollection = await db.createCollection(collection.name);
        await collection.initialize(dbCollection);
    }
}
exports.initializeDatabase = initializeDatabase;

//# sourceMappingURL=index.js.map
