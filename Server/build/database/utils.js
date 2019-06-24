"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
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
//# sourceMappingURL=utils.js.map