"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_tools_1 = require("@jms-1/isxs-tools");
const isxs_validation_1 = require("@jms-1/isxs-validation");
const debug = require("debug");
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
exports.databaseError = debug('database');
let loader;
function sleep(ms) {
    return new Promise(success => setTimeout(success, ms));
}
async function dbConnect() {
    for (;; await sleep(5000)) {
        if (!loader) {
            const options = {
                autoReconnect: true,
                promiseLibrary: Promise,
                reconnectTries: Number.MAX_VALUE,
                useNewUrlParser: true,
            };
            if (config_1.Config.user) {
                options.auth = {
                    user: config_1.Config.user,
                    password: config_1.Config.password,
                };
            }
            loader = mongodb_1.MongoClient.connect(config_1.Config.db, options);
        }
        try {
            const client = await loader;
            return client.db();
        }
        catch (e) {
            exports.databaseError('unable to connect to database: %s', isxs_tools_1.getMessage(e));
            loader = null;
        }
    }
}
exports.dbConnect = dbConnect;
class MigratableCollection extends isxs_validation_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.migrationMap = {};
    }
    cacheMigrated(item) {
        if (this.migrationMap[item._id]) {
            throw new Error(`duplicated identifier '${item._id}`);
        }
        this.migrationMap[item._id] = item;
    }
    async migrate() {
        for (let item of Object.values(this.migrationMap)) {
            await this.insertOne(item);
        }
    }
}
class MovieDbCollection extends MigratableCollection {
    async getCollection() {
        const db = await dbConnect();
        return db.collection(this.name);
    }
}
exports.MovieDbCollection = MovieDbCollection;

//# sourceMappingURL=utils.js.map
