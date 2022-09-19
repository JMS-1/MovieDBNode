"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForeignKeyCollection = void 0;
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const collections_1 = require("./collections");
class ForeignKeyCollection extends collection_1.CollectionBase {
    async initialize() {
        const db = await this.connection.database;
        await db.command({ collMod: this.collectionName, validator: {} });
    }
    async beforeRemove(_id) {
        const recordings = await this.connection.getCollection(collections_1.collectionNames.recordings);
        const count = await recordings.countDocuments({ [this.parentProp]: _id });
        switch (count) {
            case 0:
                return;
            case 1:
                throw new Error(`${this.entityName} wird noch für eine Aufzeichnung verwendet`);
            default:
                throw new Error(`${this.entityName} wird noch für ${count} Aufzeichnungen verwendet`);
        }
    }
}
exports.ForeignKeyCollection = ForeignKeyCollection;
//# sourceMappingURL=foreignKey.js.map