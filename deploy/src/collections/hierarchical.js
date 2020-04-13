"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const collections_1 = require("./collections");
class HierarchicalCollection extends collection_1.CollectionBase {
    async demandParent(parentId) {
        if (!parentId) {
            return false;
        }
        const self = await this.collection;
        const parent = await self.findOne({ _id: parentId });
        if (!parent) {
            throw new Error(`Übergeordnete ${this.entityName} unbekannt.`);
        }
        return true;
    }
    async beforeInsert(item) {
        await this.demandParent(item.parentId);
    }
    async beforeUpdate(item, id) {
        if (!(await this.demandParent(item.parentId))) {
            return;
        }
        const self = await this.collection;
        const all = await self.find({}, { projection: { _id: 1, parentId: 1 } }).toArray();
        const parentMap = {};
        all.forEach((c) => (parentMap[c._id] = c.parentId));
        parentMap[id] = item.parentId;
        const cycleTest = new Set();
        for (; id; id = parentMap[id]) {
            if (cycleTest.has(id)) {
                throw new Error('Zyklische Definition nicht zulässig');
            }
            cycleTest.add(id);
        }
    }
    async beforeRemove(_id) {
        const recordings = await this.connection.getCollection(collections_1.collectionNames.recordings);
        const count = await recordings.countDocuments({ containerId: _id });
        switch (count) {
            case 0:
                return;
            case 1:
                throw new Error(`${this.entityName} wird noch für eine Aufzeichnung verwendet`);
            default:
                throw new Error(`${this.entityName} wird noch für ${count} Aufzeichnungen verwendet`);
        }
    }
    async afterRemove(item) {
        const self = await this.collection;
        await self.updateMany({ parentId: item._id }, { $unset: { parentId: null } });
    }
}
exports.HierarchicalCollection = HierarchicalCollection;

//# sourceMappingURL=hierarchical.js.map
