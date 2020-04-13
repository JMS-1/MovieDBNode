"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const collection_1 = require("@jms-1/mongodb-graphql/lib/collection");
const types = __importStar(require("@jms-1/mongodb-graphql/lib/types"));
const collections_1 = require("./collections");
const connection_1 = require("./connection");
const utils_1 = require("./utils");
const entities_1 = require("../model/entities");
const utils_2 = require("../model/utils");
const escapeReg = /[.*+?^${}()|[\]\\]/g;
const collation = { locale: 'en', strength: 2 };
exports.RecordingCollection = connection_1.MongoConnection.createCollection(entities_1.Recording, class extends collection_1.Collection {
    constructor() {
        super(...arguments);
        this.collectionName = collections_1.collectionNames.recordings;
        this.findByContainer = this.queries.register('findByContainer', {
            containerId: types.GqlString({
                description: 'Die eindeutige Kennung der Ablage.',
                validation: {
                    pattern: utils_2.uniqueIdPattern,
                    type: 'string',
                },
            }),
        }, types.GqlArray(this.model), 'Alle Aufzeichnungen in einer Ablage ermitteln.', async (args) => {
            const self = await this.collection;
            const recordings = await self.find({ containerId: args.containerId }).sort({ fullName: 1 }).toArray();
            return Promise.all(recordings.map(async (r) => await this.toGraphQL(r)));
        });
        this.query = this.queries.register('query', {
            correlationId: types.GqlNullable(types.GqlId({ description: 'Eindeutige Kennung für diesen Aufruf.' })),
            firstPage: types.GqlInt({
                description: '0-basierte Nummer der Ergebnisseite.',
                validation: { min: 0, type: 'number' },
            }),
            fullName: types.GqlNullable(types.GqlString({
                description: 'Optional ein Suchmuster für den vollständigen Namen einer Aufzeichnung.',
            })),
            genres: types.GqlNullable(types.GqlArray(types.GqlString({
                validation: {
                    pattern: utils_2.uniqueIdPattern,
                    type: 'string',
                },
            }), { description: 'Optional eine Liste von Kategorien, die Aufzeichnungen alle haben müssen.' })),
            language: types.GqlNullable(types.GqlString({ description: 'Optional die Sprache die eine Aufzeichnung haben muss.' })),
            pageSize: types.GqlInt({
                description: 'Die Größe einer Ergebnisseite.',
                validation: { max: 100000, min: 1, type: 'number' },
            }),
            rent: types.GqlNullable(types.GqlBoolean({ description: 'Optional gesetzt um nur verliehene Aufzeichnungen zu erhalten.' })),
            series: types.GqlNullable(types.GqlArray(types.GqlString({
                validation: {
                    pattern: utils_2.uniqueIdPattern,
                    type: 'string',
                },
            }), { description: 'Optional eine Liste von Serien, von denen eine Aufzeichnung eine haben muss.' })),
            sort: entities_1.RecordingSort,
            sortOrder: types.SortDirection,
        }, entities_1.RecordingQueryResponse, 'Freie Suche über Aufzeichnungen.', async (args) => {
            const filter = {};
            if (args.language) {
                filter.languages = args.language.toString();
            }
            if (args.genres && args.genres.length > 0) {
                filter.genres = { $all: args.genres.map((s) => s.toString()) };
            }
            if (args.series && args.series.length > 0) {
                filter.series = { $in: args.series.map((s) => s.toString()) };
            }
            if (typeof args.rent === 'boolean') {
                filter.rentTo = { $exists: args.rent };
            }
            if (args.fullName) {
                filter.fullName = { $options: 'i', $regex: args.fullName.toString().replace(escapeReg, '\\$&') };
            }
            const query = [{ $match: filter }];
            const baseQuery = [...query];
            query.push({
                $facet: {
                    count: [{ $count: 'total' }],
                    genres: [{ $unwind: '$genres' }, { $group: { _id: '$genres', count: { $sum: 1 } } }],
                    view: [
                        {
                            $sort: {
                                [args.sort === entities_1.TRecordingSort.created ? 'created' : 'fullName']: args.sortOrder === types.TSortDirection.Ascending ? +1 : -1,
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
            const countRes = firstRes && firstRes.count && firstRes.count[0];
            delete filter.languages;
            const languageInfo = await self
                .aggregate([
                ...baseQuery,
                { $unwind: '$languages' },
                { $group: { _id: '$languages', count: { $sum: 1 } } },
            ], { collation })
                .toArray();
            return {
                correlationId: args.correlationId,
                count: (countRes && countRes.total) || 0,
                genres: (firstRes && firstRes.genres) || [],
                languages: languageInfo || [],
                total: await self.countDocuments(),
                view: (firstRes && firstRes.view) || [],
            };
        });
    }
    async initialize() {
        const self = await this.collection;
        await self.createIndex({ containerId: 1 }, { name: 'recording_container' });
        await self.createIndex({ created: 1 }, { name: 'recording_date' });
        await self.createIndex({ genres: 1 }, { name: 'recording_genres' });
        await self.createIndex({ languages: 1 }, { name: 'recording_languages' });
        await self.createIndex({ name: 1 }, { name: 'recording_name' });
        await self.createIndex({ rentTo: 1 }, { name: 'recording_rent' });
        await self.createIndex({ series: 1 }, { name: 'recording_series' });
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
        const existing = await keys.countDocuments({ _id: { $in: test } });
        if (existing !== test.length) {
            throw new Error(`${scope} nicht gefunden.`);
        }
    }
    async demandForeignKeys(item) {
        await this.validateForeignKeys(collections_1.collectionNames.containers, 'Ablage', item.containerId);
        await this.validateForeignKeys(collections_1.collectionNames.series, 'Serie', item.series);
        await this.validateForeignKeys(collections_1.collectionNames.languages, 'Sprache', item.languages);
        await this.validateForeignKeys(collections_1.collectionNames.genres, 'Kategorie', item.genres);
    }
    async setFullName(item) {
        var _a;
        const names = await utils_1.refreshRecordingNames({ _id: item._id }, await this.collection);
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
    beforeUpdate(item, id) {
        return this.demandForeignKeys(item);
    }
    afterUpdate(item) {
        return this.setFullName(item);
    }
});

//# sourceMappingURL=recording.js.map
