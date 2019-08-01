"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
const debug = require("debug");
const recording_1 = require("./entities/recording");
const utils_1 = require("./utils");
const utils_2 = require("../utils");
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
    async initialize(collection) {
        await collection.createIndex({ containerId: 1 }, { name: 'recording_container' });
        await collection.createIndex({ created: 1 }, { name: 'recording_date' });
        await collection.createIndex({ genres: 1 }, { name: 'recording_genres' });
        await collection.createIndex({ languages: 1 }, { name: 'recording_languages' });
        await collection.createIndex({ name: 1 }, { name: 'recording_name' });
        await collection.createIndex({ rentTo: 1 }, { name: 'recording_rent' });
        await collection.createIndex({ series: 1 }, { name: 'recording_series' });
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
        const errors = isxs_validation_1.validate(recording, this.schema);
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
        if (req.fullName) {
            filter.fullName = { $regex: req.fullName.toString().replace(escapeReg, '\\$&'), $options: 'i' };
        }
        const query = [{ $match: filter }];
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
    async inUse(property, id, scope) {
        const me = await this.getCollection();
        const count = await me.countDocuments({ [property]: typeof id === 'string' && id });
        switch (count) {
            case 0:
                return undefined;
            case 1:
                return `${scope} wird noch für eine Aufzeichnung verwendet`;
            default:
                return `${scope} wird noch für ${count} Aufzeichnungen verwendet`;
        }
    }
    async insertOne(recording) {
        const errors = await super.insertOne(recording);
        if (!errors || errors.length < 1) {
            try {
                await this.refreshFullNames({ _id: recording._id });
            }
            catch (error) {
                utils_1.databaseError('failed to refresh recording full name: %s', utils_2.getError(error));
            }
        }
        return errors;
    }
    async findOneAndReplace(recording) {
        const existing = await this.findOne(recording._id);
        if (existing) {
            recording = Object.assign({}, recording, { created: existing.created });
        }
        const errors = await super.findOneAndReplace(recording);
        if (!errors || errors.length < 1) {
            try {
                await this.refreshFullNames({ _id: recording._id });
            }
            catch (error) {
                utils_1.databaseError('failed to refresh recording full name: %s', utils_2.getError(error));
            }
        }
        return errors;
    }
    async refreshFullNames(filter) {
        const me = await this.getCollection();
        const query = [
            { $match: filter },
            { $lookup: { as: 'series', foreignField: '_id', from: 'series', localField: 'series' } },
            { $project: { _id: 1, name: 1, series: { $ifNull: [{ $arrayElemAt: ['$series', 0] }, null] } } },
            {
                $project: {
                    _id: 1,
                    fullName: {
                        $cond: {
                            if: { $eq: ['$series', null] },
                            then: '$name',
                            else: { $concat: ['$series.fullName', ' > ', '$name'] },
                        },
                    },
                },
            },
        ];
        const results = await me.aggregate(query).toArray();
        for (let recording of results) {
            await me.findOneAndUpdate({ _id: recording._id }, { $set: { fullName: recording.fullName } });
        }
    }
    async queryContainer(id) {
        const me = await this.getCollection();
        return me
            .find({ containerId: typeof id === 'string' && id }, { collation })
            .sort({ fullName: 1 })
            .toArray();
    }
})();

//# sourceMappingURL=recording.js.map
