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
const container_1 = require("./collections/container");
const genre_1 = require("./collections/genre");
const language_1 = require("./collections/language");
const recording_1 = require("./collections/recording");
const series_1 = require("./collections/series");
const config_1 = require("./config");
const utfBom = Buffer.from([0xef, 0xbb, 0xbf]);
async function startup() {
    const app = express_1.default();
    app.use(express_1.default.static(path_1.join(__dirname, '../dist')));
    app.use(body_parser_1.json());
    app.get('/export', (_request, response) => {
        response.setHeader('Content-disposition', 'attachment; filename=export.csv');
        response.setHeader('Content-Type', 'text/csv; charset=utf-8');
        response.status(200);
        response.write(utfBom);
        response.write(recording_1.csvData, 'utf-8');
        response.end();
    });
    const server = new apollo_server_express_1.ApolloServer({
        context: ({ req, res }) => {
            const context = { isAdmin: false, isAuth: false, requireAuth: false, res };
            const auth = /^Basic (.+)$/.exec(req.headers.authorization || '');
            if (auth) {
                const user = /^([^:]*):([^:]*)$/.exec(Buffer.from(auth[1], 'base64').toString());
                if (user) {
                    context.isAuth = true;
                    context.isAdmin = user[1] === config_1.Config.gqlUser && user[2] === config_1.Config.gqlPassword;
                }
            }
            return context;
        },
        plugins: [
            {
                requestDidStart() {
                    return {
                        didEncounterErrors(requestContext) {
                            var _a;
                            if (((_a = requestContext === null || requestContext === void 0 ? void 0 : requestContext.context) === null || _a === void 0 ? void 0 : _a.requireAuth) === false) {
                                const gqlErrors = (requestContext === null || requestContext === void 0 ? void 0 : requestContext.errors) || [];
                                if (gqlErrors.some((e) => e.originalError instanceof apollo_server_express_1.AuthenticationError)) {
                                    requestContext.context.requireAuth = true;
                                }
                            }
                        },
                        willSendResponse(requestContext) {
                            var _a, _b;
                            if ((_a = requestContext === null || requestContext === void 0 ? void 0 : requestContext.context) === null || _a === void 0 ? void 0 : _a.requireAuth) {
                                requestContext.context.res.status(401);
                                if ((_b = requestContext.response) === null || _b === void 0 ? void 0 : _b.http) {
                                    requestContext.response.http.headers.set('WWW-Authenticate', 'Basic realm="neuroomNet CMS"');
                                }
                            }
                        },
                    };
                },
            },
        ],
        schema: new graphql_1.GraphQLSchema(await schema_1.createSchemaConfiguration({
            containers: container_1.ContainerCollection,
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
