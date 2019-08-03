"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_tools_1 = require("@jms-1/isxs-tools");
const isxs_validation_1 = require("@jms-1/isxs-validation");
const series_1 = require("./entities/series");
const recording_1 = require("./recording");
const utils_1 = require("./utils");
__export(require("./entities/series"));
exports.seriesCollection = new (class extends utils_1.MovieDbCollection {
    constructor() {
        super(...arguments);
        this.name = series_1.collectionName;
        this.schema = series_1.SeriesSchema;
    }
    async initialize(collection) {
        await collection.createIndex({ fullName: 1 }, { name: 'series_full' });
        await collection.createIndex({ name: 1 }, { name: 'series_name' });
        await collection.createIndex({ parentId: 1 }, { name: 'series_tree' });
    }
    fromSql(sql) {
        const series = {
            _id: sql.Id,
            name: sql.Name || '',
        };
        if (sql.Description) {
            series.description = sql.Description;
        }
        if (sql.Parent) {
            series.parentId = sql.Parent;
        }
        const errors = isxs_validation_1.validate(series, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(series);
    }
    async canDelete(id) {
        return recording_1.recordingCollection.inUse('series', id, 'Serie');
    }
    async postDelete(id) {
        const me = await this.getCollection();
        await me.updateMany({ parentId: typeof id === 'string' && id }, { $unset: { parentId: null } });
    }
    async updateFullName(series, parent, me, updates) {
        updates.push(series._id);
        const fullName = parent ? `${parent} > ${series.name}` : series.name;
        await me.findOneAndUpdate({ _id: series._id }, { $set: { fullName } });
        const children = await me.find({ parentId: series._id }).toArray();
        for (let child of children) {
            await this.updateFullName(child, fullName, me, updates);
        }
    }
    async refreshFullNames(series) {
        const me = await this.getCollection();
        const updated = [];
        if (series) {
            const parent = await me.findOne({ _id: series.parentId });
            await this.updateFullName(series, parent && parent.fullName, me, updated);
        }
        else {
            const children = await me.find({ parentId: null }).toArray();
            for (let child of children) {
                await this.updateFullName(child, '', me, updated);
            }
        }
        return updated;
    }
    async insertOne(series) {
        const errors = await super.insertOne(series);
        if (!errors || errors.length < 1) {
            try {
                await this.refreshFullNames(series);
            }
            catch (error) {
                utils_1.databaseError('failed to refresh series full name: %s', isxs_tools_1.getMessage(error));
            }
        }
        return errors;
    }
    async findOneAndReplace(series) {
        const errors = await super.findOneAndReplace(series);
        if (!errors || errors.length < 1) {
            try {
                await recording_1.recordingCollection.refreshFullNames({ series: { $in: await this.refreshFullNames(series) } });
            }
            catch (error) {
                utils_1.databaseError('failed to refresh series full name: %s', isxs_tools_1.getMessage(error));
            }
        }
        return errors;
    }
})();

//# sourceMappingURL=series.js.map
