"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const entities_1 = require("../model/entities");
exports.GenreCollection = connection_1.MongoConnection.createCollection(entities_1.Genre, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.genres;
    }
    async initialize() {
        const db = await this.connection.database;
        await db.command({ collMod: this.collectionName, validator: {} });
    }
    async beforeRemove(_id) {
        const recordings = await this.connection.getCollection(collections_1.collectionNames.recordings);
        const count = await recordings.countDocuments({ genres: _id });
        switch (count) {
            case 0:
                return;
            case 1:
                throw new Error('Kategorie wird noch für eine Aufzeichnung verwendet');
            default:
                throw new Error(`Kategorie wird noch für ${count} Aufzeichnungen verwendet`);
        }
    }
});

//# sourceMappingURL=genre.js.map
