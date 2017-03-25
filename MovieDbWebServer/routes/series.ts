import { Router, Request, Response } from 'express';
import { Db, IndexOptions } from 'mongodb';

import { sharedConnection, findEntity } from '../database/db';
import { seriesCollection, ISeries, recordingCollection } from '../database/model';
import { ISeriesDetails, sendJson } from './protocol';

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

export default Router()
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findSeries(req.params["id"])));
