"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingCollection = exports.csvData = void 0;
exports.escape = escape;
const mongodb_graphql_1 = require("@jms-1/mongodb-graphql");
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const types = __importStar(require("@jms-1/mongodb-graphql/lib/types"));
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const utils_1 = require("./utils");
const model = __importStar(require("../model"));
const entities = __importStar(require("../model/entities"));
const utils_2 = require("../model/utils");
exports.csvData = "";
function escape(str) {
    return `"${(str || "").replace(/"/g, '""')}"`;
}
const escapeReg = /[.*+?^${}()|[\]\\]/g;
const collation = { locale: "en", strength: 2 };
exports.RecordingCollection = connection_1.MongoConnection.createCollection(entities.Recording, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.recordings;
        this.findByContainer = this.queries.register("findByContainer", {
            containerId: types.GqlId({
                description: "Die eindeutige Kennung der Ablage.",
                validation: {
                    pattern: utils_2.uniqueIdPattern,
                    type: "string",
                },
            }),
        }, types.GqlArray(this.model), "Alle Aufzeichnungen in einer Ablage ermitteln.", async (args) => {
            const self = await this.collection;
            const recordings = await self
                .find({ containerId: args.containerId })
                .sort({ fullName: 1 })
                .toArray();
            return Promise.all(recordings.map(async (r) => await this.toGraphQL(r)));
        });
        this.query = this.queries.register("query", {
            correlationId: types.GqlNullable(types.GqlId({ description: "Eindeutige Kennung für diesen Aufruf." })),
            deleteType: types.GqlNullable(entities.RecordingDeleteType),
            firstPage: types.GqlInt({
                description: "0-basierte Nummer der Ergebnisseite.",
                validation: { min: 0, type: "number" },
            }),
            forExport: types.GqlNullable(types.GqlBoolean({
                description: "Erlaubt den Abruf des Ergebnisses als CSV Inhalt.",
            })),
            fullName: types.GqlNullable(types.GqlString({
                description: "Optional ein Suchmuster für den vollständigen Namen einer Aufzeichnung.",
            })),
            genres: types.GqlNullable(types.GqlArray(types.GqlString({
                validation: {
                    pattern: utils_2.uniqueIdPattern,
                    type: "string",
                },
            }), {
                description: "Optional eine Liste von Kategorien, die Aufzeichnungen alle haben müssen.",
            })),
            language: types.GqlNullable(types.GqlString({
                description: "Optional die Sprache die eine Aufzeichnung haben muss.",
            })),
            pageSize: types.GqlInt({
                description: "Die Größe einer Ergebnisseite.",
                validation: { min: 1, type: "number" },
            }),
            rating: types.GqlNullable(types.GqlInt({
                description: "Optionale Bewertung auf iMDb.",
            })),
            rent: types.GqlNullable(types.GqlBoolean({
                description: "Optional gesetzt um nur verliehene Aufzeichnungen zu erhalten.",
            })),
            series: types.GqlNullable(types.GqlArray(types.GqlString({
                validation: {
                    pattern: utils_2.uniqueIdPattern,
                    type: "string",
                },
            }), {
                description: "Optional eine Liste von Serien, von denen eine Aufzeichnung eine haben muss.",
            })),
            sort: entities.RecordingSort,
            sortOrder: types.SortDirection,
        }, entities.RecordingQueryResponse, "Freie Suche über Aufzeichnungen.", async (args) => {
            var _a;
            const filter = {};
            if (args.language)
                filter.languages = args.language;
            if (args.genres && args.genres.length > 0)
                filter.genres = { $all: args.genres };
            if (args.series && args.series.length > 0)
                filter.series = { $in: args.series };
            switch (args.rent) {
                case true:
                    filter.rentTo = { $nin: ["", null] };
                    break;
                case false:
                    filter.rentTo = { $in: ["", null] };
                    break;
            }
            if (args.fullName)
                filter.fullName = {
                    $options: "i",
                    $regex: args.fullName.replace(escapeReg, "\\$&"),
                };
            if (args.rating != null)
                filter.rating = { $gte: args.rating };
            if (args.deleteType != null)
                filter.deleteType = args.deleteType
                    ? args.deleteType
                    : { $in: [0, null] };
            const query = [{ $match: filter }];
            const baseQuery = [...query];
            let sortAttr = `$${args.sort === model.TRecordingSort.created
                ? "created"
                : args.sort === model.TRecordingSort.fullName
                    ? "fullName"
                    : "rating"}`;
            if (args.sort === model.TRecordingSort.rating)
                sortAttr = {
                    $ifNull: [
                        sortAttr,
                        args.sortOrder === mongodb_graphql_1.TSortDirection.Ascending ? 11 : 0,
                    ],
                };
            query.push({
                $facet: {
                    count: [{ $count: "total" }],
                    genres: [
                        { $unwind: "$genres" },
                        { $group: { _id: "$genres", count: { $sum: 1 } } },
                    ],
                    view: [
                        { $set: { _sort_: sortAttr } },
                        {
                            $sort: {
                                _sort_: args.sortOrder === mongodb_graphql_1.TSortDirection.Ascending ? +1 : -1,
                            },
                        },
                        { $skip: args.firstPage * args.pageSize },
                        { $limit: args.pageSize },
                    ],
                },
            });
            const self = await this.collection;
            const result = await self
                .aggregate(query, { collation })
                .toArray();
            const firstRes = result && result[0];
            const countRes = (_a = firstRes === null || firstRes === void 0 ? void 0 : firstRes.count) === null || _a === void 0 ? void 0 : _a[0];
            delete filter.languages;
            const languageInfo = await self
                .aggregate([
                ...baseQuery,
                { $unwind: "$languages" },
                { $group: { _id: "$languages", count: { $sum: 1 } } },
            ], { collation })
                .toArray();
            const response = {
                correlationId: args.correlationId,
                count: (countRes === null || countRes === void 0 ? void 0 : countRes.total) || 0,
                genres: (firstRes === null || firstRes === void 0 ? void 0 : firstRes.genres) || [],
                languages: languageInfo || [],
                total: await self.countDocuments(),
                view: (firstRes === null || firstRes === void 0 ? void 0 : firstRes.view) || [],
            };
            if (!args.forExport) {
                return response;
            }
            const languageCollection = await this.connection.getCollection(collections_1.collectionNames.languages);
            const languages = await languageCollection
                .find({})
                .toArray();
            const languageMap = {};
            languages.forEach((l) => (languageMap[l._id] = l.name));
            const genreCollection = await this.connection.getCollection(collections_1.collectionNames.genres);
            const genres = await genreCollection.find({}).toArray();
            const genreMap = {};
            genres.forEach((g) => (genreMap[g._id] = g.name));
            exports.csvData = "Name;Sprachen;Kategorien\r\n";
            for (const recording of response.view) {
                const name = escape(recording.fullName);
                const languages = escape((recording.languages || [])
                    .map((l) => languageMap[l] || l)
                    .join("; "));
                const genres = escape((recording.genres || []).map((l) => genreMap[l] || l).join("; "));
                exports.csvData += `${name};${languages};${genres}\r\n`;
            }
            return {
                correlationId: args.correlationId,
                count: 0,
                genres: [],
                languages: [],
                total: 0,
                view: [],
            };
        });
    }
    async initialize() {
        const db = await this.connection.database;
        await db.command({ collMod: this.collectionName, validator: {} });
        const self = await this.collection;
        await self.createIndex({ containerId: 1 }, { name: "recording_container" });
        await self.createIndex({ created: 1 }, { name: "recording_date" });
        await self.createIndex({ genres: 1 }, { name: "recording_genres" });
        await self.createIndex({ languages: 1 }, { name: "recording_languages" });
        await self.createIndex({ name: 1 }, { name: "recording_name" });
        await self.createIndex({ rentTo: 1 }, { name: "recording_rent" });
        await self.createIndex({ series: 1 }, { name: "recording_series" });
    }
    async validateForeignKeys(collectionName, scope, ids) {
        if (!ids) {
            return;
        }
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        const test = Array.from(new Set(ids));
        const keys = await this.connection.getCollection(collectionName);
        const existing = await keys.countDocuments({
            _id: { $in: test },
        });
        if (existing !== test.length) {
            throw new Error(`${scope} nicht gefunden.`);
        }
    }
    async demandForeignKeys(item) {
        await this.validateForeignKeys(collections_1.collectionNames.containers, "Ablage", item.containerId);
        await this.validateForeignKeys(collections_1.collectionNames.genres, "Kategorie", item.genres);
        await this.validateForeignKeys(collections_1.collectionNames.languages, "Sprache", item.languages);
        await this.validateForeignKeys(collections_1.collectionNames.series, "Serie", item.series);
    }
    async setFullName(item) {
        var _a;
        const names = await (0, utils_1.refreshRecordingNames)({ _id: item._id }, await this.collection);
        if (((_a = names[0]) === null || _a === void 0 ? void 0 : _a._id) === item._id) {
            item.fullName = names[0].fullName;
        }
    }
    beforeInsert(item) {
        item.created = new Date().toISOString();
        return this.demandForeignKeys(item);
    }
    afterInsert(item) {
        return this.setFullName(item);
    }
    beforeUpdate(item) {
        return this.demandForeignKeys(item);
    }
    afterUpdate(item) {
        return this.setFullName(item);
    }
});
//# sourceMappingURL=recording.js.map