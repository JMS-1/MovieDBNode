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
    constructor() {
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
            await this.insert(item);
        }
    }
    async getCollection() {
        const db = await dbConnect();
        return db.collection(this.name);
    }
    async insert(container) {
        try {
            const me = await this.getCollection();
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
                        constraint: 'database',
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
    async query(filter, sort, project) {
        const me = await this.getCollection();
        let query = me.find(filter);
        if (sort) {
            query = query.sort(sort);
        }
        if (project) {
            query = query.project(project);
        }
        return query.toArray();
    }
}
exports.CollectionBase = CollectionBase;

//# sourceMappingURL=utils.js.map
