import { Collection, Filter } from 'mongodb'

import { collectionNames } from './collections'

import { IRecording } from '../model'

interface IAggregateFullName {
    _id: string
    fullName: string
}

export async function refreshRecordingNames(
    filter: Filter<IRecording>,
    recordings: Collection<IRecording>
): Promise<IAggregateFullName[]> {
    const query = [
        { $match: filter },
        { $lookup: { as: 'series', foreignField: '_id', from: collectionNames.series, localField: 'series' } },
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
    ]

    const results = (await recordings.aggregate<IAggregateFullName>(query).toArray()) || []

    for (const recording of results) {
        await recordings.findOneAndUpdate({ _id: recording._id }, { $set: { fullName: recording.fullName } })
    }

    return results
}
