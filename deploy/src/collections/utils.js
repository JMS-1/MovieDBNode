"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("./collections");
async function refreshRecordingNames(filter, recordings) {
    const query = [
        { $match: filter },
        { $lookup: { as: 'series', foreignField: '_id', from: collections_1.collectionNames.series, localField: 'series' } },
        { $project: { _id: 1, name: 1, series: { $ifNull: [{ $arrayElemAt: ['$series', 0] }, null] } } },
        {
            $project: {
                _id: 1,
                fullName: {
                    $cond: {
                        else: { $concat: ['$series.fullName', ' > ', '$name'] },
                        if: { $eq: ['$series', null] },
                        then: '$name',
                    },
                },
            },
        },
    ];
    const results = (await recordings.aggregate(query).toArray()) || [];
    for (const recording of results) {
        await recordings.findOneAndUpdate({ _id: recording._id }, { $set: { fullName: recording.fullName } });
    }
    return results;
}
exports.refreshRecordingNames = refreshRecordingNames;

//# sourceMappingURL=utils.js.map
