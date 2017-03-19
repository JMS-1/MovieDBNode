import { Collection, FindOneAndReplaceOption } from 'mongodb';
import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';
import * as uuid from 'uuid/v4';

import { ISearchRequest, ISearchInformation, ILanguageSearchInformation, IGenreSearchInformation, ISearchResultInformation, IRecordingEditDescription, IRecordingEdit, ILink, sendJson } from './protocol';
import { recordingCollection, IRecording, mediaCollection, IMedia } from '../database/model';
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

async function getResults(request?: ISearchRequest): Promise<ISearchInformation> {
    if (!request)
        request = {
            order: "hierarchicalName",
            ascending: true,
            genres: [],
            series: [],
            size: 15,
            page: 0,
        };

    var fields = { name: 1, rentTo: 1, genres: 1, series: 1, created: 1, languages: 1 };
    var query = {};

    var db = await connect();
    var rec = db.collection(recordingCollection);
    var total = await rec.count(query);
    var allRecordings = await rec.find(query, fields, request.page * request.size, request.size).toArray();
    var allLanguages = await getCounts(rec, query, "languages");
    var allGenres = await getCounts(rec, query, "genres");

    return new Promise<ISearchInformation>(setResult => setResult({
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
            rent: r.rentTo,
            title: r.name,
            id: r._id
        })
    }));
}

interface IJoinedRecording extends IRecording {
    joinedMedia: IMedia[];
}

// Ermittelt zu einer Aufzeichnung alle für die Pflege notwendigen Informationen.
async function getRecordingForEdit(id: string): Promise<IRecordingEdit> {
    var db = await connect();

    var recordings = await db.collection(recordingCollection).aggregate([
        { $match: { _id: id } },
        { $lookup: { from: mediaCollection, localField: "media", foreignField: "_id", "as": "joinedMedia" } }])
        .toArray();

    return new Promise<IRecordingEdit>(setResult => {
        var recording = recordings[0];
        var media = recording.joinedMedia[0];

        setResult({
            links: (recording.links || []).map(l => <ILink>{ description: l.description, name: l.name, url: l.url }),
            languages: recording.languages || [],
            description: recording.description,
            genres: recording.genres || [],
            container: media.container,
            series: recording.series,
            location: media.position,
            rent: recording.rentTo,
            title: recording.name,
            mediaType: media.type,
            id: recording._id,
        });
    });
}

async function setRecordingForEdit(id: string, newData: IRecordingEditDescription): Promise<any> {
    var db = await connect();

    var queryMedia = <IMedia>{
        container: (newData.container || "").trim() || null,
        position: (newData.location || "").trim() || null,
        type: newData.mediaType
    };

    var updateMedia = { $setOnInsert: { ...queryMedia, _id: uuid() } };

    return db
        .collection(mediaCollection)
        .findOneAndUpdate(queryMedia, updateMedia, <FindOneAndReplaceOption><any>{ upsert: true, returnNewDocument: true });
}

router.get('/query', async (req: Request, res: Response) => sendJson(res, await getResults()));

router.post('/query', async (req: Request & Parsed, res: Response) => sendJson(res, await getResults(req.body)));

router.get('/:id', async (req: Request, res: Response) => sendJson(res, await getRecordingForEdit(req.params["id"])));

router.put('/:id', async (req: Request & Parsed, res: Response) => {
    var info = await setRecordingForEdit(req.params["id"], req.body);

    res.sendStatus(200);
    res.end();
});

export default router;