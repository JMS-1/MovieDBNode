"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const mongodb_1 = require("mongodb");
const validation_1 = require("./validation");
const utils_1 = require("../utils");
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
            if (process.env.DBUSER) {
                options.auth = {
                    user: process.env.DBUSER,
                    password: process.env.DBPASSWORD,
                };
            }
            loader = mongodb_1.MongoClient.connect(process.env.DATABASE, options);
        }
        try {
            const client = await loader;
            return client.db();
        }
        catch (e) {
            exports.databaseError('unable to connect to database: %s', utils_1.getError(e));
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
    initialize(collection) {
        return Promise.resolve(undefined);
    }
    async migrate() {
        for (let item of Object.values(this.migrationMap)) {
            await this.insertOne(item);
        }
    }
    async getCollection() {
        const db = await dbConnect();
        return db.collection(this.name);
    }
    async insertOne(item) {
        try {
            const me = await this.getCollection();
            await me.insertOne(item);
            return undefined;
        }
        catch (error) {
            if (error.code !== 121) {
                exports.databaseError('error during insert: %s', utils_1.getError(error));
                throw error;
            }
            try {
                return (validation_1.validate(item, this.schema) || [{ constraint: 'database', message: utils_1.getError(error), property: '*' }]);
            }
            catch (e) {
                exports.databaseError('error during insert validation: %s', utils_1.getError(e));
                throw error;
            }
        }
    }
    async findOneAndReplace(item) {
        try {
            const me = await this.getCollection();
            const updated = await me.findOneAndReplace({ _id: item._id }, item);
            if (!updated) {
                return [{ constraint: 'database', message: 'Nicht gefunden', property: '_id' }];
            }
            return undefined;
        }
        catch (error) {
            if (error.code !== 121) {
                exports.databaseError('error during update: %s', utils_1.getError(error));
                throw error;
            }
            try {
                return (validation_1.validate(item, this.schema) || [{ constraint: 'database', message: utils_1.getError(error), property: '*' }]);
            }
            catch (e) {
                exports.databaseError('error during update validation: %s', utils_1.getError(e));
                throw error;
            }
        }
    }
    async find(filter, sort, project) {
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
    async findOne(id) {
        const me = await this.getCollection();
        return me.findOne({ _id: id.toString() });
    }
    canDelete(id) {
        return Promise.resolve(undefined);
    }
    postDelete(id) {
        return Promise.resolve(undefined);
    }
    async deleteOne(id) {
        try {
            const forbidDelete = await this.canDelete(id);
            if (forbidDelete) {
                return [{ constraint: 'delete', property: '*', message: forbidDelete }];
            }
            const me = await this.getCollection();
            const deleted = await me.deleteOne({ _id: typeof id === 'string' && id });
            if (deleted.deletedCount !== 1) {
                return [{ constraint: 'delete', property: '*', message: 'nicht gefunden' }];
            }
            await this.postDelete(id);
            return undefined;
        }
        catch (error) {
            return [{ constraint: 'database', property: '*', message: utils_1.getError(error) }];
        }
    }
}
exports.CollectionBase = CollectionBase;

//# sourceMappingURL=utils.js.map
