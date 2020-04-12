"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_tools_1 = require("@jms-1/isxs-tools");
const server_1 = require("@jms-1/isxs-validation/server");
const debug_1 = __importDefault(require("debug"));
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
exports.databaseError = debug_1.default('database');
let loader;
function sleep(ms) {
    return new Promise(success => setTimeout(success, ms));
}
async function dbConnect() {
    for (;; await sleep(5000)) {
        if (!loader) {
            const options = {
                promiseLibrary: Promise,
                useNewUrlParser: true,
                useUnifiedTopology: true,
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
class MigratableCollection extends server_1.CollectionBase {
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
