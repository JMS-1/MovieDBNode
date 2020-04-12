"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const hierarchical_1 = require("./hierarchical");
const entities_1 = require("../model/entities");
exports.SeriesCollection = connection_1.MongoConnection.createCollection(entities_1.Series, class extends hierarchical_1.HierarchicalCollection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.series;
        this.entityName = 'Serie';
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
