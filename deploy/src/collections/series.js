"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const entities_1 = require("../model/entities");
exports.SeriesCollection = connection_1.MongoConnection.createCollection(entities_1.Series, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.series;
    }
    async demandParent(parentId) {
        if (!parentId) {
            return false;
        }
        const self = await this.collection;
        const parent = await self.findOne({ _id: parentId });
        if (!parent) {
            throw new Error('Übergeordnete Serie unbekannt.');
        }
        return true;
    }
    async beforeInsert(container) {
        await this.demandParent(container.parentId);
    }
    async beforeUpdate(container, id) {
        if (!(await this.demandParent(container.parentId))) {
            return;
        }
        const self = await this.collection;
        const all = await self.find({}, { projection: { _id: 1, parentId: 1 } }).toArray();
        const parentMap = {};
        all.forEach((c) => (parentMap[c._id] = c.parentId));
        parentMap[id] = container.parentId;
        const cycleTest = new Set();
        for (; id; id = parentMap[id]) {
            if (cycleTest.has(id)) {
                throw new Error('Zyklische Definition von Serien nicht zulässig');
            }
            cycleTest.add(id);
        }
    }
    async beforeRemove(_id) {
        const recordings = await this._connection.getCollection(collections_1.collectionNames.recordings);
        const count = await recordings.countDocuments({ series: _id });
        switch (count) {
            case 0:
                return;
            case 1:
                throw new Error('Serie wird noch für eine Aufzeichnung verwendet');
            default:
                throw new Error(`Serie wird noch für ${count} Aufzeichnungen verwendet`);
        }
    }
    async afterRemove(series) {
        const self = await this.collection;
        const children = await self.find({ parentId: series._id }).toArray();
        await self.updateMany({ parentId: series._id }, { $unset: { parentId: null } });
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
