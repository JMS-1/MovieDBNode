"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function refreshRecordingNames(filter, recordings) {
    const query = [
        { $match: filter },
        { $lookup: { as: 'series', foreignField: '_id', from: 'series', localField: 'series' } },
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
    const results = await recordings.aggregate(query).toArray();
    for (const recording of results) {
        await recordings.findOneAndUpdate({ _id: recording._id }, { $set: { fullName: recording.fullName } });
    }
}
exports.refreshRecordingNames = refreshRecordingNames;

//# sourceMappingURL=utils.js.map
