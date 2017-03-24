import { Router, Request, Response } from 'express';
import { Db, IndexOptions } from 'mongodb';
import { Parsed } from 'body-parser';

import * as uuid from 'uuid/v4';

import { sharedConnection, ensureNameIndex, findEntity, deleteEntity } from '../database/db';
import { containerCollection, IContainer, recordingCollection, IRecording, mediaCollection, IMedia, IDbUnique, IDbName } from '../database/model';

import { IContainerDetails, IContainerData, IContainerRecording, seriesSeparator, hierarchicalNamePipeline, sendJson, sendStatus } from './protocol';

async function findContainer(id: string): Promise<IContainerDetails> {
    await ensureNameIndex(containerCollection);

    return findEntity<IContainerDetails, IContainer>(id, containerCollection, async (db, result, item) => {
        // Alle untergeordneten Aufbewahrung auf die einfache Art (find) ermitteln.
        var children: IDbName[] = await db.collection(containerCollection).find({ container: id }, { _id: 0, name: 1 }).sort({ name: 1 }).toArray();

        // Protokoll füllen.
        result.children = children.map(c => c.name);
        result.parent = item.container || null;
        result.description = item.description;
        result.location = item.position;
        result.type = item.type;

        // Die Aufzeichnungen dieser Aufbewahrungen sind etwas kniffeliger.
        result.recordings = await db.collection(mediaCollection).aggregate<IContainerRecording>([
            // Suchen wir erst einmal alle zugeordneten Medien.
            { $match: { container: id } },
            // Einem Medium einer Aufbewahrung können beliebig viele Aufzeichnungen zugeordnet sein.
            { $lookup: { from: recordingCollection, localField: "_id", foreignField: "media", as: "recordings" } },
            // Für jede Aufzeichnung machen wir uns eine Ergebniszeile.
            { $unwind: "$recordings" },
            // Dabei konzentrieren wird uns ausschließlcih auf die relevanten Eigenschaften.
            { $project: { _id: "$recordings._id", name: "$recordings.name", series: "$recordings.series", position: 1 } },
            // Mit der Hilfsfunktion berechnen wir die vollständigen Namen der Aufzeichnungen.
            ...hierarchicalNamePipeline({ name: { $first: "$name" }, position: { $first: "$position" }, }, { name: 1, position: 1 }),
            // Die Ergebnisse können wir dann in das benötigte Protokollformat kürzen.
            { $project: { id: "$_id", _id: 0, position: 1, name: "$hierarchicalName" } },
            // Und dann einfach nach dem vollständigen Namen sortieren.
            { $sort: { name: 1 } }
        ]).toArray();
    });
}

async function addContainer(item: IContainerData): Promise<boolean> {
    var newItem: IContainer = {
        description: item.description || null,
        position: item.location || null,
        type: parseInt(`${item.type}`),
        name: item.name || null,
        container: item.parent,
        _id: uuid()
    };

    var db = await ensureNameIndex(containerCollection);
    var result = await db.collection(containerCollection).insertOne(newItem);

    return new Promise<boolean>(setResult => setResult(result.insertedCount === 1));
}

async function updateContainer(id: string, item: IContainerData): Promise<boolean> {
    var newItem = <IContainer>{
        description: item.description || null,
        position: item.location || null,
        type: parseInt(`${item.type}`),
        name: item.name || null,
        container: item.parent
    };

    var db = await ensureNameIndex(containerCollection);
    var result = await db.collection(containerCollection).updateOne({ _id: id }, { $set: newItem });

    return new Promise<boolean>(setResult => setResult(result.matchedCount === 1));
}

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addContainer(req.body)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findContainer(req.params["id"])))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateContainer(req.params["id"], req.body)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], containerCollection)));
