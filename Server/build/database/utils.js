"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const validation_1 = require("./validation");
const utils_1 = require("../utils");
let loader;
function sleep(ms) {
    return new Promise(success => setTimeout(success, ms));
}
async function dbConnect() {
    for (;; await sleep(5000)) {
        if (!loader) {
            loader = mongodb_1.MongoClient.connect(process.env.DATABASE, {
                autoReconnect: true,
                promiseLibrary: Promise,
                reconnectTries: Number.MAX_VALUE,
                useNewUrlParser: true,
            });
        }
        try {
            const client = await loader;
            return client.db();
        }
        catch (e) {
            loader = null;
        }
    }
}
exports.dbConnect = dbConnect;
class CollectionBase {
    async insert(container) {
        try {
            const db = await dbConnect();
            const me = await db.collection(this.name);
            await me.insertOne(container);
            return undefined;
        }
        catch (error) {
            if (error.code !== 121) {
                throw error;
            }
            try {
                return (validation_1.validate(container, this.schema) || [
                    {
                        contraint: 'database',
                        message: utils_1.getError(error),
                        property: '*',
                    },
                ]);
            }
            catch (e) {
                throw error;
            }
        }
    }
}
exports.CollectionBase = CollectionBase;

//# sourceMappingURL=utils.js.map
