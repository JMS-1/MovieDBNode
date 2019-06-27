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
exports.recordingCollection = new (class extends utils_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.name = recording_1.collectionName;
        this.schema = recording_1.RecordingSchema;
    }
    fromSql(sql) {
        const date = dateReg.exec(sql.Created);
        const recording = {
            _id: sql.Id,
            created: (date && `${date[1]}Z`) || sql.Created,
            genres: [],
            languages: [],
            links: [],
            media: sql.Media,
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
                    from: 'series',
                    startWith: '$series',
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
                            input: { $reverseArray: '$hierarchy' },
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
        query.push({
            $facet: {
                count: [{ $count: 'total' }],
                languages: [{ $unwind: '$languages' }, { $group: { _id: '$languages', count: { $sum: 1 } } }],
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
        const result = await me.aggregate(query).toArray();
        const firstRes = result && result[0];
        const countRes = firstRes && firstRes.count && firstRes.count[0];
        return {
            count: (countRes && countRes.total) || 0,
            genres: (firstRes && firstRes.genres) || [],
            languages: (firstRes && firstRes.languages) || [],
            total: await me.countDocuments(),
            view: (firstRes && firstRes.view) || [],
        };
    }
})();

//# sourceMappingURL=recording.js.map
