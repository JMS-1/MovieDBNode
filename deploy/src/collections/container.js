"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const connection_1 = require("./connection");
const recording_1 = require("./recording");
const entities_1 = require("../model/entities");
exports.ContainerCollection = connection_1.MongoConnection.createCollection(entities_1.Container, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = 'containers';
    }
    async beforeRemove(_id) {
        const self = await recording_1.RecordingCollection.collection;
        const count = await self.countDocuments({ containerId: _id });
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
