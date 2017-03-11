import { Router, Request, Response } from 'express';
import { Collection } from 'mongodb';

import { ISearchRequest, ISearchInformation, ILanguageSearchInformation, IGenreSearchInformation, ISearchResultInformation, sendJson } from './protocol';
import { recordingCollection, IRecording } from '../database/model';
import { connect } from '../database/db';

const router = Router();

interface IGroup {
    group: number;

    count: number;
}

function getCounts(recordings: Collection, query: any, field: string): Promise<IGroup[]> {
    return recordings
        .aggregate<IGroup>([
            { $match: query },
            { $project: { _id: 0, [field]: 1 } },
            { $unwind: `$${field}` },
            { $group: { _id: `$${field}`, count: { $sum: 1 } } },
            { $project: { _id: 0, group: "$_id", count: 1 } }
        ])
        .toArray() as Promise<IGroup[]>;
}

function query(request?: ISearchRequest): Promise<ISearchInformation> {
    if (!request)
        request = {
            order: "hierarchicalName",
            ascending: true,
            genres: [],
            series: [],
            size: 15,
            page: 0,
        };

    return connect().then(db => {
        var fields = { name: 1, rentTo: 1, genres: 1, series: 1, created: 1, languages: 1 };
        var query = {};

        var rec = db.collection(recordingCollection);

        return rec.count(query)
            .then(total => rec.find(query, fields, request.page * request.size, request.size).toArray()
                .then(allRecordings => getCounts(rec, query, "languages")
                    .then(allLanguages => getCounts(rec, query, "genres")
                        .then(allGenres => <ISearchInformation>{
                            total: total,
                            page: request.page,
                            size: request.size,
                            genres: allGenres.map(l => <IGenreSearchInformation>{ id: `${l.group}`, count: l.count }),
                            languages: allLanguages.map(l => <ILanguageSearchInformation>{ id: `${l.group}`, count: l.count }),
                            recordings: allRecordings.map((r: IRecording) => <ISearchResultInformation>{
                                series: (r.series === null) ? null : `${r.series}`,
                                languages: (r.languages || []).map(l => `${l}`),
                                genres: (r.genres || []).map(g => `${g}`),
                                createdAsString: r.created.toISOString(),
                                id: `${r._id}`,
                                rent: r.rentTo,
                                title: r.name,
                            })
                        }))));
    });
}

router.get('/query', (req: Request, res: Response) => query().then(info => sendJson(res, info)));

router.post('/query', (req: Request, res: Response) => query(req["body"]).then(info => sendJson(res, info)));

export default router;