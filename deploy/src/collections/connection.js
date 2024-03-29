"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoConnection = void 0;
const connection_1 = require("@jms-1/mongodb-graphql/lib/connection");
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
const clientOptions = {};
if (config_1.Config.user) {
    clientOptions.auth = { password: config_1.Config.password, username: config_1.Config.user };
}
exports.MongoConnection = new connection_1.Connection(mongodb_1.MongoClient.connect(config_1.Config.db, clientOptions));
//# sourceMappingURL=connection.js.map