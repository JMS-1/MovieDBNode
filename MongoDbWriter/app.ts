import * as mongo from "mongodb";

import * as legacy from "./src/legacy";

function reportError(error: any): void {
    console.log(error.message);
}

mongo
    .MongoClient
    .connect("mongodb://localhost:27017/movieDb")
    .then(db => legacy.migrate(db))
    .then(db => console.log("Migration finished - Database has been reset!"), reportError);
