"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreCollection = void 0;
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const foreignKey_1 = require("./foreignKey");
const entities_1 = require("../model/entities");
exports.GenreCollection = connection_1.MongoConnection.createCollection(entities_1.Genre, class extends foreignKey_1.ForeignKeyCollection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.genres;
        this.entityName = 'Kategorie';
        this.parentProp = 'genres';
    }
});

//# sourceMappingURL=genre.js.map
