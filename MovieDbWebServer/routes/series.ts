import { Router, Request, Response } from 'express';
import { Db, IndexOptions } from 'mongodb';
import { Parsed } from 'body-parser';

import * as uuid from 'uuid/v4';

import { sharedConnection, findEntity, deleteEntity } from '../database/db';
import { seriesCollection, ISeries, recordingCollection } from '../database/model';
import { ISeriesDetails, ISeriesData, sendJson, sendStatus } from './protocol';

async function ensureIndex(): Promise<Db> {
    var options: IndexOptions = { name: `${seriesCollection}_Unique`, unique: true };

    var db = await sharedConnection;
    var index = await db.collection(seriesCollection).createIndex({ series: 1, name: 1 }, options);

    return new Promise<Db>(setResult => setResult(db));
}

async function findSeries(id: string): Promise<ISeriesDetails> {
    await ensureIndex();

    return findEntity<ISeriesDetails, ISeries>(id, seriesCollection, async (db, result, item) => {
        result.unused = !await db.collection(seriesCollection).findOne({ series: item._id });

        if (result.unused)
            result.unused = !await db.collection(recordingCollection).findOne({ series: item._id });

        result.description = item.description;
        result.parentId = item.series;
    });
}

async function addSeries(item: ISeriesData): Promise<boolean> {
    var newItem: ISeries = {
        description: item.description || null,
        series: item.parentId || null,
        name: item.name || null,
        _id: uuid()
    };

    var db = await ensureIndex();
    var result = await db.collection(seriesCollection).insertOne(newItem);

    return new Promise<boolean>(setResult => setResult(result.insertedCount === 1));
}

async function updateSeries(id: string, item: ISeriesData): Promise<boolean> {
    var newItem = <ISeries>{
        description: item.description || null,
        series: item.parentId || null,
        name: item.name || null
    };

    var db = await ensureIndex();
    var result = await db.collection(seriesCollection).updateOne({ _id: id }, { $set: newItem });

    return new Promise<boolean>(setResult => setResult(result.matchedCount === 1));
}

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addSeries(req.body)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findSeries(req.params["id"])))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateSeries(req.params["id"], req.body)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], seriesCollection)));
