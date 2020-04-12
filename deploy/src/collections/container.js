"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const entities_1 = require("../model/entities");
exports.ContainerCollection = connection_1.MongoConnection.createCollection(entities_1.Container, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.containers;
    }
    async demandParent(parentId) {
        if (!parentId) {
            return false;
        }
        const self = await this.collection;
        const parent = await self.findOne({ _id: parentId });
        if (!parent) {
            throw new Error('Übergeordnete Ablage unbekannt.');
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
                throw new Error('Zyklische Definition von Ablagen nicht zulässig');
            }
            cycleTest.add(id);
        }
    }
    async beforeRemove(_id) {
        const recordings = await this._connection.getCollection(collections_1.collectionNames.recordings);
        const count = await recordings.countDocuments({ containerId: _id });
        switch (count) {
            case 0:
                return;
            case 1:
                throw new Error('Ablage wird noch für eine Aufzeichnung verwendet');
            default:
                throw new Error(`Ablage wird noch für ${count} Aufzeichnungen verwendet`);
        }
    }
    async afterRemove(container) {
        const self = await this.collection;
        await self.updateMany({ parentId: container._id }, { $unset: { parentId: null } });
    }
});

//# sourceMappingURL=container.js.map
