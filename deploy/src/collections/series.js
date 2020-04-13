"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const hierarchical_1 = require("./hierarchical");
const utils_1 = require("./utils");
const entities_1 = require("../model/entities");
exports.SeriesCollection = connection_1.MongoConnection.createCollection(entities_1.Series, class extends hierarchical_1.HierarchicalCollection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.series;
        this.entityName = 'Serie';
    }
    async initialize() {
        const self = await this.collection;
        await self.createIndex({ fullName: 1 }, { name: 'series_full' });
        await self.createIndex({ name: 1 }, { name: 'series_name' });
        await self.createIndex({ parentId: 1 }, { name: 'series_tree' });
    }
    async afterInsert(series) {
        await this.refreshFullNames(series);
    }
    async afterUpdate(series) {
        const seriesIds = await this.refreshFullNames(series);
        await utils_1.refreshRecordingNames({ series: { $in: Array.from(seriesIds) } }, await this.connection.getCollection(collections_1.collectionNames.recordings));
    }
    async afterRemove(series) {
        const self = await this.collection;
        const children = await self.find({ parentId: series._id }).toArray();
        await super.afterRemove(series);
        await this.updateFullNameByChildren(children, '', self, new Set());
    }
    async updateFullName(series, parent, self, updated) {
        if (updated.has(series._id)) {
            return updated;
        }
        updated.add(series._id);
        const fullName = parent ? `${parent} > ${series.name}` : series.name;
        await self.findOneAndUpdate({ _id: series._id }, { $set: { fullName } });
        series.fullName = fullName;
        return this.updateFullNameByParent(series._id, fullName, self, updated);
    }
    async updateFullNameByChildren(children, parentName, self, updated) {
        for (const child of children) {
            await this.updateFullName(child, parentName, self, updated);
        }
        return updated;
    }
    async updateFullNameByParent(parentId, parentName, self, updated) {
        return this.updateFullNameByChildren(await self.find({ parentId }).toArray(), parentName, self, updated);
    }
    async refreshFullNames(series) {
        const self = await this.collection;
        if (!series) {
            return this.updateFullNameByParent(null, '', self, new Set());
        }
        const parent = await self.findOne({ _id: series.parentId });
        return this.updateFullName(series, parent === null || parent === void 0 ? void 0 : parent.fullName, self, new Set());
    }
});

//# sourceMappingURL=series.js.map
