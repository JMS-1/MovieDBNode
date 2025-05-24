"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@jms-1/mongodb-graphql/lib/schema");
const debug_1 = __importDefault(require("debug"));
const express_1 = __importDefault(require("express"));
const graphql_1 = require("graphql");
const path_1 = require("path");
const server_1 = require("@apollo/server");
const cors_1 = __importDefault(require("cors"));
const express5_1 = require("@as-integrations/express5");
const http_1 = require("http");
const container_1 = require("./collections/container");
const genre_1 = require("./collections/genre");
const language_1 = require("./collections/language");
const recording_1 = require("./collections/recording");
const series_1 = require("./collections/series");
const config_1 = require("./config");
const utils_1 = require("./utils");
const utfBom = Buffer.from([0xef, 0xbb, 0xbf]);
async function startup() {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    app.use((req, res, next) => {
        const { originalUrl } = req;
        const hasLanguage = originalUrl === "/de" ||
            originalUrl.startsWith("/de/") ||
            originalUrl === "/en" ||
            originalUrl.startsWith("/en/");
        if (!config_1.Config.defaultRoute) {
            next();
        }
        else if (originalUrl.startsWith("/graphql")) {
            next();
        }
        else if (hasLanguage) {
            next();
        }
        else {
            res.redirect(`/de${originalUrl}`);
        }
    });
    app.use(express_1.default.static((0, path_1.join)(__dirname, "../dist/browser")));
    app.get("/:lang?/export", (_request, response) => {
        response.setHeader("Content-disposition", "attachment; filename=export.csv");
        response.setHeader("Content-Type", "text/csv; charset=utf-8");
        response.status(200);
        response.write(utfBom);
        response.write(recording_1.csvData, "utf-8");
        response.end();
    });
    const server = new server_1.ApolloServer({
        schema: new graphql_1.GraphQLSchema(await (0, schema_1.createSchemaConfiguration)({
            containers: container_1.ContainerCollection,
            genres: genre_1.GenreCollection,
            languages: language_1.LanguageCollection,
            recordings: recording_1.RecordingCollection,
            series: series_1.SeriesCollection,
        })),
    });
    await server.start();
    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express5_1.expressMiddleware)(server));
    await new Promise((resolve) => httpServer.listen({ port: config_1.Config.port }, resolve));
}
function startupError(error) {
    (0, debug_1.default)("startup")("%s", (0, utils_1.getMessage)(error));
}
try {
    startup().then(undefined, startupError).catch(startupError);
}
catch (error) {
    startupError(error);
}
//# sourceMappingURL=startup.js.map