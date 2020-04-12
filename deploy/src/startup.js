"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_tools_1 = require("@jms-1/isxs-tools");
const schema_1 = require("@jms-1/mongodb-graphql/lib/schema");
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = require("body-parser");
const debug_1 = __importDefault(require("debug"));
const express_1 = __importDefault(require("express"));
const graphql_1 = require("graphql");
const path_1 = require("path");
const api_1 = require("./api");
const container_1 = require("./collections/container");
const genre_1 = require("./collections/genre");
const language_1 = require("./collections/language");
const recording_1 = require("./collections/recording");
const series_1 = require("./collections/series");
const config_1 = require("./config");
const database_1 = require("./database");
async function startup() {
    await database_1.initializeDatabase();
    const app = express_1.default();
    app.use(express_1.default.static(path_1.join(__dirname, '../dist')));
    app.use(body_parser_1.json());
    api_1.installApi(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema: new graphql_1.GraphQLSchema(schema_1.createSchemaConfiguration({
            container: container_1.ContainerCollection,
            genres: genre_1.GenreCollection,
            languages: language_1.LanguageCollection,
            recordings: recording_1.RecordingCollection,
            series: series_1.SeriesCollection,
        })),
    });
    server.applyMiddleware({ app });
    app.listen(config_1.Config.port);
}
function startupError(error) {
    debug_1.default('startup')('%s', isxs_tools_1.getMessage(error));
}
try {
    startup().then(undefined, startupError).catch(startupError);
}
catch (error) {
    startupError(error);
}

//# sourceMappingURL=startup.js.map
