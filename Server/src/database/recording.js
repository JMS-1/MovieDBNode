"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const recording_1 = require("./entities/recording");
const utils_1 = require("./utils");
const validation_1 = require("./validation");
__export(require("./entities/recording"));
const databaseTrace = debug('database:trace');
const dateReg = /^CAST\(N'([^\.]+)(\.\d+)?' AS DateTime\)$/;
const escapeReg = /[.*+?^${}()|[\]\\]/g;
const collation = { locale: 'en', strength: 2 };
exports.recordingCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = recording_1.collectionName;
        this.schema = recording_1.RecordingSchema;
        this.mediaMigration = {};
    }
    fromSql(sql) {
        const date = dateReg.exec(sql.Created);
        const recording = {
            _id: sql.Id,
            containerType: 0,
            created: (date && `${date[1]}Z`) || sql.Created,
            genres: [],
            languages: [],
            links: [],
            name: sql.Name,
        };
        if (sql.Description) {
            recording.description = sql.Description;
        }
        if (sql.RentTo) {
            recording.rentTo = sql.RentTo;
        }
        if (sql.Series) {
            recording.series = sql.Series;
        }
        const errors = validation_1.validate(recording, this.schema);
        if (errors) {
            throw new Error(JSON.stringify(errors));
        }
        this.cacheMigrated(recording);
        this.mediaMigration[recording._id] = sql.Media;
    }
    async query(req) {
        const filter = {};
        if (req.language) {
            filter.languages = req.language.toString();
        }
        if (req.genres && req.genres.length > 0) {
            filter.genres = { $all: req.genres.map(s => s.toString()) };
        }
        if (req.series && req.series.length > 0) {
            filter.series = { $in: req.series.map(s => s.toString()) };
        }
        if (typeof req.rent === 'boolean') {
            filter.rentTo = { $exists: req.rent };
        }
        const query = [
            { $match: filter },
            {
                $graphLookup: {
                    as: 'hierarchy',
                    connectFromField: 'parentId',
                    connectToField: '_id',
                    depthField: '_depth',
                    from: 'series',
                    startWith: '$series',
                },
            },
            { $unwind: { path: '$hierarchy', preserveNullAndEmptyArrays: true } },
            { $sort: { 'hierarchy._depth': 1 } },
            {
                $group: {
                    _id: '$_id',
                    created: { $first: '$created' },
                    description: { $first: '$description' },
                    genres: { $first: '$genres' },
                    languages: { $first: '$languages' },
                    links: { $first: '$links' },
                    media: { $first: '$media' },
                    name: { $first: '$name' },
                    rentTo: { $first: '$rentTo' },
                    series: { $first: '$series' },
                    sortedHierarchy: { $push: '$hierarchy' },
                },
            },
            {
                $project: {
                    _id: 1,
                    created: 1,
                    description: 1,
                    fullName: {
                        $reduce: {
                            in: { $concat: ['$$this.name', ' > ', '$$value'] },
                            initialValue: '$name',
                            input: '$sortedHierarchy',
                        },
                    },
                    genres: 1,
                    languages: 1,
                    links: 1,
                    media: 1,
                    name: 1,
                    rentTo: 1,
                    series: 1,
                },
            },
        ];
        if (req.fullName) {
            query.push({
                $match: { fullName: { $regex: req.fullName.toString().replace(escapeReg, '\\$&'), $options: 'i' } },
            });
        }
        const baseQuery = [...query];
        query.push({
            $facet: {
                count: [{ $count: 'total' }],
                genres: [{ $unwind: '$genres' }, { $group: { _id: '$genres', count: { $sum: 1 } } }],
                view: [
                    { $sort: { [req.sort.toString()]: req.sortOrder === 'ascending' ? +1 : -1 } },
                    { $skip: 1 * req.firstPage * req.pageSize },
                    { $limit: 1 * req.pageSize },
                ],
            },
        });
        databaseTrace('query recordings: %j', query);
        const me = await this.getCollection();
        const result = await me.aggregate(query, { collation }).toArray();
        const firstRes = result && result[0];
        const countRes = firstRes && firstRes.count && firstRes.count[0];
        delete filter.languages;
        const languageInfo = await me
            .aggregate([...baseQuery, { $unwind: '$languages' }, { $group: { _id: '$languages', count: { $sum: 1 } } }], { collation })
            .toArray();
        return {
            correlationId: req.correlationId,
            count: (countRes && countRes.total) || 0,
            genres: (firstRes && firstRes.genres) || [],
            languages: languageInfo || [],
            total: await me.countDocuments(),
            list: (firstRes && firstRes.view) || [],
        };
    }
    async findOneAndReplace(recording) {
        const existing = await this.findOne(recording._id);
        if (existing) {
            recording = Object.assign({}, recording, { created: existing.created });
        }
        return super.findOneAndReplace(recording);
    }
    async deleteOne(id) {
        return [{ constraint: 'database', property: '*', message: 'not yet implemented' }];
    }
})();

//# sourceMappingURL=recording.js.map
