import { Db, Collection } from 'mongodb';
import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

import * as uuid from 'uuid/v4';

import { ISearchRequest, ISearchInformation, IRecordingResult, IRecordingData, IRecordingDetails, ILink, hierarchicalNamePipeline, sendJson, sendStatus } from './protocol';
import { recordingCollection, IRecording, ILink as IRecordingLink, mediaCollection, IMedia, genreCollection, IGenre, languageCollection, ILanguage } from '../database/model';
import { sharedConnection } from '../database/db';

// Führt eine Suche nach Aufzeichnungen durch.
async function getResults(request?: ISearchRequest): Promise<ISearchInformation> {
    // Die Suchbedingung ist optional und führt bei Abwesentheit zu einer Voreinstellung.
    if (!request)
        request = {
            order: "hierarchicalName",
            ascending: true,
            genres: [],
            series: [],
            size: 15,
            page: 0,
        };

    // Die Teile der Suchbedingung, die auf den physikalischen Spalten immer ausgeführt werden.
    var preQuery: { rentTo?: any; series?: any; genres?: any; } = {};

    if (request.rent !== null)
        if (request.rent)
            preQuery.rentTo = { $ne: null };
        else
            preQuery.rentTo = null;

    if (request.series.length > 0)
        preQuery.series = { $in: request.series };

    if (request.genres.length > 0)
        preQuery.genres = { $all: request.genres };

    // Die Einschränkung bezüglich der Sprache wird nicht auf die Bewertung der Sprachen angewendet.
    var languageQuery: { languages?: any; } = {};

    if (request.language)
        languageQuery.languages = { $elemMatch: { $eq: request.language } };

    // Die Suchbedingung auf den hierarchischen Namen, der erst einmal zusammengesetzt werden muss.
    var postQuery: { hierarchicalName?: any; } = {};

    if (request.text) {
        var pattern = "";

        for (var i = 0; i < request.text.length; i++) {
            var code = `${request.text.charCodeAt(i).toString(16)}`;

            pattern += `\\x${code}`;
        }

        postQuery.hierarchicalName = { $regex: pattern, $options: "i" };
    }

    // Sortierung auswerten - ok, viel können wir da nicht bieten.
    var sort = (request.order === "date") ? "created" : "hierarchicalName";

    // Aggregation vorbereiten.

    // - Die Grundeinschränkung, die immer angewendet werden muss und vor allem auch den hierarchischen Namen berechnet.
    var corePipeline = [
        // Die angeforderte Einschränkung auf den physikalisch abgelegten Spalten berücksichtigen.
        { $match: preQuery },

        // Den vollständigen Namen ermitteln.
        ...hierarchicalNamePipeline({
            rentTo: { $first: "$rentTo" },
            genres: { $first: "$genres" },
            created: { $first: "$created" },
            languages: { $first: "$languages" }
        }, {
                series: 1,
                genres: 1,
                id: "$_id",
                created: 1,
                languages: 1,
                title: "$name",
                rent: "$rentTo"
            }),

        // Die angeforderte Einschränkung auf den berechneten Spalten berücksichtigen.
        { $match: postQuery }
    ];

    // - Gesamte Anzahl von Aufzeichnungen in der Suchebdingung ermitteln.
    var totalPipeline = [
        // Die Sprache muss berücksichtigt werden.
        { $match: languageQuery },

        // Einfach nur zählen.
        { $count: "count" }
    ];

    // - Den gewünschten Ausschnitt der Ergebnistabelle ermitteln.
    var tablePipeline = [
        // Die Sprache muss berücksichtigt werden.
        { $match: languageQuery },

        // Nach dem vollständigen Namen sortieren.
        { $sort: { [sort]: request.ascending ? +1 : -1 } },

        // Blättern ausführen.
        { $skip: request.page * request.size },

        // Seitengröße berücksichtigen.
        { $limit: request.size },

        // Nachschlagen der vollständigen Informationen zu Sprachen und Kategorien.
        { $lookup: { from: genreCollection, localField: "genres", foreignField: "_id", "as": "genreInformation" } },
        { $lookup: { from: languageCollection, localField: "languages", foreignField: "_id", "as": "languageInformation" } },

        // Hierarchischen Namen sowie die interne Kennung ausblenden und Uhrzeit in Textdarstellung wandeln.
        {
            $project: {
                id: 1,
                _id: 0,
                rent: 1,
                title: 1,
                series: 1,
                genreInformation: 1,
                languageInformation: 1,
                createdAsString: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S.%LZ", date: "$created" } }
            }
        }
    ];

    // - Die Bewertung der Kategorien ermitteln.
    var genrePipeline = [
        // Die Sprache muss berücksichtigt werden.
        { $match: languageQuery },

        // Uns interessieren nur die Kategorien.
        { $project: { _id: 0, genres: 1 } },

        // Ausgefaltet pro Aufzeichnung.
        { $unwind: `$genres` },

        // Dann die Aufzeichnungen danach gruppieren.
        { $group: { _id: `$genres`, count: { $sum: 1 } } },

        // Und das Ergebnis in die Protokollstruktur wandeln.
        { $project: { _id: 0, id: "$_id", count: 1 } }
    ];

    // - Die Bewertung der Sprachen ohne die Einschräknung auf die Sprache ermitteln.
    var languagePipeline = [
        // Hier interessieren dann nur die Sprachen.
        { $project: { _id: 0, languages: 1 } },

        // Ausgefaltet pro Aufzeichnung.
        { $unwind: `$languages` },

        // Dann die Aufzeichnungen danach gruppieren.
        { $group: { _id: `$languages`, count: { $sum: 1 } } },

        // Und das Ergebnis in die Protokollstruktur wandeln.
        { $project: { _id: 0, id: "$_id", count: 1 } }
    ];

    // - Die eigentliche Auswertung verwendet möglichst viele der zum Teil teuren Zwischenergebnisse gleichzeitig.
    var fullPipeline = [
        // Erst einmal die Einschränkungen ohne Sprache aber mit dem Einmischen der hierarchischen Namen.
        ...corePipeline,

        {
            $facet: {
                // Bewertung der Sprachen.
                languages: languagePipeline,

                // Gesamte Anzahl in der Ergebnismenge.
                total: totalPipeline,

                // Der gewählte Ausschnitt der Ergebnismenge.
                table: tablePipeline,

                // Bewertung der Kategorien.
                genres: genrePipeline,
            }
        }
    ];

    // Abfragen ausführen.
    var db = await sharedConnection;
    var rec = db.collection(recordingCollection);

    console.time("query");
    var all = await rec.aggregate(fullPipeline).toArray();
    console.timeEnd("query");

    // Wir bereiten die Liste der Kategorien und Sprachen der Aufzeichnungen etwas auf, damit der Anwender diese immer in der gleichen Reihenfolge sieht.
    var allRecordings: (IRecordingResult & { genreInformation: IGenre[]; languageInformation: ILanguage[]; })[] = all[0].table;

    allRecordings.forEach(r => {
        r.languageInformation.sort((l, r) => l.name.localeCompare(r.name));
        r.genreInformation.sort((l, r) => l.name.localeCompare(r.name));

        r.languages = r.languageInformation.map(r => r._id);
        r.genres = r.genreInformation.map(r => r._id);

        delete r.languageInformation;
        delete r.genreInformation;
    });

    // Antwort an den Client zusammenstellen.
    var total: { count: number; }[] = all[0].total;

    return new Promise<ISearchInformation>(setResult => setResult({
        page: request.page,
        size: request.size,
        genres: all[0].genres,
        recordings: allRecordings,
        languages: all[0].languages,
        total: total[0] ? total[0].count : 0
    }));
}

// Daten einer Aufzeichnung mit zusätzlich eingemischten Informationen der Ablage.
interface IJoinedRecording extends IRecording {
    joinedMedia: IMedia[];
}

// Ermittelt zu einer Aufzeichnung alle für die Pflege notwendigen Informationen.
async function getRecordingForEdit(id: string): Promise<IRecordingDetails> {
    var db = await sharedConnection;

    // Die eine Aufzeichnung suchen.
    var recordings = await db.collection(recordingCollection).aggregate<IJoinedRecording>([
        // Einschränkung auf die eine Aufzeichnung.
        { $match: { _id: id } },

        // Und dann noch die Informationen zur Ablage einmischen.
        { $lookup: { from: mediaCollection, localField: "media", foreignField: "_id", "as": "joinedMedia" } }])
        .toArray();

    // Ergebnis in die Protokollstrukturen wandeln.
    return new Promise<IRecordingDetails>(setResult => {
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

async function updateRecording(id: string, newData: IRecordingData): Promise<boolean> {
    var db = await sharedConnection;
    var recording = await prepareRecording(db, newData);

    var result = await db.collection(recordingCollection).updateOne({ _id: id }, { $set: recording });

    return new Promise<boolean>(setResult => setResult(result.result.n === 1));
}

async function createRecording(newData: IRecordingData): Promise<boolean> {
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

async function prepareRecording(database: Db, newData: IRecordingData): Promise<IRecording> {
    var mediaId = await getMediaId(database, <IMedia>{
        container: (newData.container || "").trim() || null,
        position: (newData.location || "").trim() || null,
        type: parseInt(`${newData.mediaType}`)
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
