import { Router, Request, Response } from 'express';
import { Db, IndexOptions } from 'mongodb';
import { Parsed } from 'body-parser';

import * as uuid from 'uuid/v4';

import { sharedConnection, findEntity, addEntity, updateEntity, deleteEntity } from '../database/db';
import { seriesCollection, ISeries, recordingCollection } from '../database/model';
import { ISeriesDetails, ISeriesData, sendJson, sendStatus } from './protocol';

async function findSeries(id: string): Promise<ISeriesDetails> {
    return findEntity<ISeriesDetails, ISeries>(id, seriesCollection, async (db, result, item) => {
        result.unused = !await db.collection(seriesCollection).findOne({ series: item._id });

        if (result.unused)
            result.unused = !await db.collection(recordingCollection).findOne({ series: item._id });

        result.description = item.description;
        result.parentId = item.series;
    });
}

function augmentSeries(dbItem: ISeries, item: ISeriesData): void {
    dbItem.description = item.description || null;
    dbItem.series = item.parentId || null;
}

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addEntity(req.body, seriesCollection, augmentSeries)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findSeries(req.params["id"])))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateEntity(req.params["id"], req.body, seriesCollection, augmentSeries)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], seriesCollection)));
