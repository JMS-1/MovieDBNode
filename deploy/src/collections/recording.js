"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const connection_1 = require("./connection");
const entities_1 = require("../model/entities");
exports.RecordingCollection = connection_1.MongoConnection.createCollection(entities_1.Recording, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = 'recordings';
    }
});

//# sourceMappingURL=recording.js.map
