"use strict";
const path_1 = require("path");
const fs_1 = require("fs");
const model = require("./model");
var _containerId = 0;
function migrateContainer(old) {
    return {
        parentId: null,
        name: old.Name,
        type: old.Type,
        _id: ++_containerId,
        location: old.ParentLocation || null,
        description: old.Description || null
    };
}
function migrateContainers(old, db) {
    return db
        .dropCollection(model.containerCollection)
        .then(success => success, error => null)
        .then(success => {
        var containerCollection = db.collection(model.containerCollection);
        var containers = [];
        var idMap = {};
        var parentMap = {};
        for (var oldContainer of old) {
            var container = migrateContainer(oldContainer);
            idMap[oldContainer.Id] = container;
            if (oldContainer.Parent)
                parentMap[oldContainer.Id] = oldContainer.Parent;
            containers.push(container);
        }
        for (var id in parentMap)
            if (parentMap.hasOwnProperty(id))
                idMap[id].parentId = idMap[parentMap[id]]._id;
        return containerCollection.insertMany(containers);
    })
        .then(result => db);
}
function migrate(db) {
    var promiseFactory = global.Promise;
    return new promiseFactory((resolve, reject) => {
        var dump = path_1.join(__dirname, "..", "..", "LocalDbReader", "Movie.json");
        fs_1.readFile(dump, "UTF-8", (error, content) => {
            if (error)
                reject(error);
            else {
                var dump = JSON.parse(content);
                resolve(migrateContainers(dump.Containers || [], db));
            }
        });
    });
}
exports.migrate = migrate;
//# sourceMappingURL=legacy.js.map