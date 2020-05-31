"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCollection = void 0;
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const foreignKey_1 = require("./foreignKey");
const entities_1 = require("../model/entities");
exports.LanguageCollection = connection_1.MongoConnection.createCollection(entities_1.Language, class extends foreignKey_1.ForeignKeyCollection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.languages;
        this.entityName = 'Sprache';
        this.parentProp = 'languages';
    }
});

//# sourceMappingURL=language.js.map
