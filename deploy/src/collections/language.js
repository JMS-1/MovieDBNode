"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const connection_1 = require("./connection");
const recording_1 = require("./recording");
const entities_1 = require("../model/entities");
exports.LanguageCollection = connection_1.MongoConnection.createCollection(entities_1.Language, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = 'languages';
    }
    async beforeRemove(_id) {
        const self = await recording_1.RecordingCollection.collection;
        const count = await self.countDocuments({ languages: _id });
        switch (count) {
            case 0:
                return;
            case 1:
                throw new Error('Sprache wird noch für eine Aufzeichnung verwendet');
            default:
                throw new Error(`Sprache wird noch für ${count} Aufzeichnungen verwendet`);
        }
    }
});

//# sourceMappingURL=language.js.map
