import * as mongo from "mongodb";

import * as legacy from "./LegacyContract";
import * as model from "./model";

function reportError(error: any): void {
    console.log(error.message);
}

legacy.loadDump((error, data) => {
    mongo
        .MongoClient
        .connect("mongodb://localhost:27017/test2")
        .then(db => {
            // Cleanup database
            db
                .dropCollection(model.containerCollection)
                .then(success => success, error => null)
                .then(success => {
                    var containerCollection = db.collection(model.containerCollection);
                    var containers = model.migrateContainers(data.Containers);

                    return containerCollection.insertMany(containers);
                })
                .then(result => {
                });
        }, reportError);
});
