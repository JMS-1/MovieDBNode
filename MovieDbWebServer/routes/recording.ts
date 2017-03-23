import { Db, Collection } from 'mongodb';
import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';
import * as uuid from 'uuid/v4';

import { ISearchRequest, ISearchInformation, ILanguageSearchInformation, IGenreSearchInformation, ISearchResultInformation, IRecordingEditDescription, IRecordingEdit, ILink, hierarchicalNamePipeline, sendJson, sendStatus } from './protocol';
import { recordingCollection, IRecording, ILink as IRecordingLink, mediaCollection, IMedia, genreCollection, IGenre, languageCollection, ILanguage } from '../database/model';
import { sharedConnection } from '../database/db';

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

    var physicalQuery: { rentTo?: any; languages?: any; series?: any; genres?: any; } = {};
    var transientQuery: { hierarchicalName?: any; } = {};

    // Suche aufbereiten.
    if (request.rent !== null)
        if (request.rent)
            physicalQuery.rentTo = { $ne: null };
        else
            physicalQuery.rentTo = null;

    if (request.language)
        physicalQuery.languages = { $elemMatch: { $eq: request.language } };

    if (request.series.length > 0)
        physicalQuery.series = { $in: request.series };

    if (request.genres.length > 0)
        physicalQuery.genres = { $all: request.genres };

    if (request.text) {
        var pattern = "";

        for (var i = 0; i < request.text.length; i++) {
            var code = `${request.text.charCodeAt(i).toString(16)}`;

            pattern += `\\x${code}`;
        }

        transientQuery.hierarchicalName = { $regex: pattern, $options: "i" };
    }

    // Aggregation vorbereiten.
    var corePipeline = [
        // Die angeforderte Einschränkung auf den physikalisch abgelegten Spalten berücksichtigen.
        { $match: physicalQuery },

        // Den vollständigen Namen ermitteln.
        ...hierarchicalNamePipeline({
            name: { $first: "$name" },
            rentTo: { $first: "$rentTo" },
            genres: { $first: "$genres" },
            created: { $first: "$created" },
            languages: { $first: "$languages" }
        }, {
                series: 1,
                genres: 1,
                id: "$_id",
                languages: 1,
                title: "$name",
                rent: "$rentTo",
                createdAsString: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S.%LZ", date: "$created" } }
            }),

        // Die angeforderte Einschränkung auf den berechneten Spalten berücksichtigen.
        { $match: transientQuery }
    ];

    // Abfragen ausführen.
    var db = await sharedConnection;
    var rec = db.collection(recordingCollection);

    var total = await rec.aggregate<{ count: number; }>([
        ...corePipeline,

        { $count: "count" }
    ]).toArray();

    var allRecordings = await rec.aggregate<ISearchResultInformation & { genreInformation: IGenre[]; languageInformation: ILanguage[]; }>([
        ...corePipeline,

        // Nach dem vollständigen Namen sortieren.
        { $sort: { hierarchicalName: 1 } },

        // Blättern ausführen.
        { $skip: request.page * request.size },

        // Seitengröße berücksichtigen.
        { $limit: request.size },

        // Nachschlagen der vollständigen Informationen zu Sprachen und Kategorien.
        { $lookup: { from: genreCollection, localField: "genres", foreignField: "_id", "as": "genreInformation" } },
        { $lookup: { from: languageCollection, localField: "languages", foreignField: "_id", "as": "languageInformation" } },

        // Hierarchischen Namen ausblenden.
        { $project: { _id: 0, series: 1, id: 1, title: 1, rent: 1, createdAsString: 1, genreInformation: 1, languageInformation: 1 } }
    ]).toArray();

    allRecordings.forEach(r => {
        r.languageInformation.sort((l, r) => l.name.localeCompare(r.name));
        r.genreInformation.sort((l, r) => l.name.localeCompare(r.name));

        r.languages = r.languageInformation.map(r => r._id);
        r.genres = r.genreInformation.map(r => r._id);

        delete r.languageInformation;
        delete r.genreInformation;
    });

    var allGenres = await rec.aggregate<IGenreSearchInformation>([
        ...corePipeline,

        { $project: { _id: 0, genres: 1 } },
        { $unwind: `$genres` },
        { $group: { _id: `$genres`, count: { $sum: 1 } } },
        { $project: { _id: 0, id: "$_id", count: 1 } }
    ]).toArray();

    // Da immer nur eine Sprache ausgewählt werden kann wird diese in der Bewertung der Sprachen nicht berücksichtigt.
    delete physicalQuery.languages;

    var allLanguages = await rec.aggregate<ILanguageSearchInformation>([
        ...corePipeline,

        { $project: { _id: 0, languages: 1 } },
        { $unwind: `$languages` },
        { $group: { _id: `$languages`, count: { $sum: 1 } } },
        { $project: { _id: 0, id: "$_id", count: 1 } }
    ]).toArray();

    return new Promise<ISearchInformation>(setResult => setResult({
        genres: allGenres,
        page: request.page,
        size: request.size,
        languages: allLanguages,
        recordings: allRecordings,
        total: total[0] ? total[0].count : 0
    }));
}

interface IJoinedRecording extends IRecording {
    joinedMedia: IMedia[];
}

// Ermittelt zu einer Aufzeichnung alle für die Pflege notwendigen Informationen.
async function getRecordingForEdit(id: string): Promise<IRecordingEdit> {
    var db = await sharedConnection;

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
    var db = await sharedConnection;
    var recording = await prepareRecording(db, newData);

    var result = await db.collection(recordingCollection).updateOne({ _id: id }, { $set: recording });

    return new Promise<boolean>(setResult => setResult(result.result.n === 1));
}

async function createRecording(newData: IRecordingEditDescription): Promise<boolean> {
    var db = await sharedConnection;
    var recording = await prepareRecording(db, newData);

    recording._id = uuid();
    recording.created = new Date();

    var result = await db.collection(recordingCollection).insertOne(recording);

    return new Promise<boolean>(setResult => setResult(result.insertedCount === 1));
}

async function deleteRecording(id: string): Promise<boolean> {
    var db = await sharedConnection;

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
