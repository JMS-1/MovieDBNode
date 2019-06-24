"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("./container");
const schema_1 = require("./schema");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
async function initializeDatabase() {
    const db = await utils_1.dbConnect();
    const collections = [container_1.containerCollection];
    for (let { schema, name } of collections) {
        validation_1.addSchema(schema);
        await db.createCollection(name);
        await db.command({ collMod: name, validator: { $jsonSchema: schema_1.convertToMongo(schema) } });
    }
}
exports.initializeDatabase = initializeDatabase;

//# sourceMappingURL=index.js.map
