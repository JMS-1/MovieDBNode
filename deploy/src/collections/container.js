"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerCollection = void 0;
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const hierarchical_1 = require("./hierarchical");
const entities_1 = require("../model/entities");
exports.ContainerCollection = connection_1.MongoConnection.createCollection(entities_1.Container, class extends hierarchical_1.HierarchicalCollection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.containers;
        this.entityName = 'Ablage';
        this.parentProp = 'containerId';
    }
});

//# sourceMappingURL=container.js.map
