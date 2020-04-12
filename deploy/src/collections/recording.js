"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const entities_1 = require("../model/entities");
exports.RecordingCollection = connection_1.MongoConnection.createCollection(entities_1.Recording, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.recordings;
    }
    async initialize() {
        const self = await this.collection;
        await self.createIndex({ containerId: 1 }, { name: 'recording_container' });
        await self.createIndex({ created: 1 }, { name: 'recording_date' });
        await self.createIndex({ genres: 1 }, { name: 'recording_genres' });
        await self.createIndex({ languages: 1 }, { name: 'recording_languages' });
        await self.createIndex({ name: 1 }, { name: 'recording_name' });
        await self.createIndex({ rentTo: 1 }, { name: 'recording_rent' });
        await self.createIndex({ series: 1 }, { name: 'recording_series' });
    }
});

//# sourceMappingURL=recording.js.map
