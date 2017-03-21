import { Db, Collection } from 'mongodb';
import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';
import * as uuid from 'uuid/v4';

import { ISearchRequest, ISearchInformation, ILanguageSearchInformation, IGenreSearchInformation, ISearchResultInformation, IRecordingEditDescription, IRecordingEdit, ILink, sendJson, sendStatus } from './protocol';
import { recordingCollection, IRecording, ILink as IRecordingLink, mediaCollection, IMedia } from '../database/model';
import { connect } from '../database/db';

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

    var recordings = await db.collection(recordingCollection).aggregate<IJoinedRecording>([
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

async function getMediaId(database: Db, media: IMedia): Promise<string> {
    var newId = uuid();
    var update = { $setOnInsert: { ...media, _id: newId } };
    var result = await database.collection(mediaCollection).findOneAndUpdate(media, update, { upsert: true });
    var value: IMedia = result.value;

    return new Promise<string>(setResult => setResult(value ? value._id : newId));
}

async function updateRecording(id: string, newData: IRecordingEditDescription): Promise<boolean> {
    var db = await connect();
    var recording = await prepareRecording(db, newData);

    var result = await db.collection(recordingCollection).updateOne({ _id: id }, { $set: recording });

    return new Promise<boolean>(setResult => setResult(result.result.n === 1));
}

async function createRecording(newData: IRecordingEditDescription): Promise<boolean> {
    var db = await connect();
    var recording = await prepareRecording(db, newData);

    recording._id = uuid();
    recording.created = new Date();

    var result = await db.collection(recordingCollection).insertOne(recording);

    return new Promise<boolean>(setResult => setResult(result.insertedCount === 1));
}

async function deleteRecording(id: string): Promise<boolean> {
    var db = await connect();

    var result = await db.collection(recordingCollection).deleteOne({ _id: id });

    return new Promise<boolean>(setResult => setResult(result.deletedCount == 1));
}

async function prepareRecording(database: Db, newData: IRecordingEditDescription): Promise<IRecording> {
    var mediaId = await getMediaId(database, <IMedia>{
        container: (newData.container || "").trim() || null,
        position: (newData.location || "").trim() || null,
        type: newData.mediaType
    });

    return new Promise<IRecording>(setResult => setResult(<IRecording>{
        description: (newData.description || "").trim() || null,
        rentTo: (newData.rent || "").trim() || null,
        name: (newData.title || "").trim() || null,
        languages: newData.languages || [],
        series: newData.series || null,
        genres: newData.genres || [],
        media: mediaId,
        links: (newData.links || []).map(l => <IRecordingLink>{
            description: (l.description || "").trim() || null,
            name: (l.name || "").trim() || null,
            url: (l.url || "").trim() || null
        })
    }));
}

export default Router()
    .get('/query', async (req: Request, res: Response) => sendJson(res, await getResults()))
    .post('/query', async (req: Request & Parsed, res: Response) => sendJson(res, await getResults(req.body)))

    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, createRecording(req.body)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await getRecordingForEdit(req.params["id"])))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateRecording(req.params["id"], req.body)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteRecording(req.params["id"])));
