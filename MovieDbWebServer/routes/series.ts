import { Router, Request, Response } from 'express';
import { Db, IndexOptions } from 'mongodb';
import { Parsed } from 'body-parser';

import * as uuid from 'uuid/v4';

// Datenbankelemente.
import { sharedConnection, findEntity, addEntity, updateEntity, deleteEntity } from '../database/db';
import { seriesCollection, ISeries, recordingCollection } from '../database/model';

// Protokollstrukturen.
import { ISeriesDetails, ISeriesData, sendJson, sendStatus } from './protocol';

// Ermittelt eine Serie zur Bearbeitung.
function findSeries(id: string): Promise<ISeriesDetails> {
    return findEntity<ISeriesDetails, ISeries>(id, seriesCollection, async (db, result, item) => {
        // Eine Serie ist in Benutzung wenn es entweder untergeordnete Serien gibt ...
        result.unused = !await db.collection(seriesCollection).findOne({ series: item._id });

        // ... oder mindestens eine Aufzeichnung zugeordnet ist.
        if (result.unused)
            result.unused = !await db.collection(recordingCollection).findOne({ series: item._id });

        // Protokolldaten komplettieren.
        result.description = item.description;
        result.parentId = item.series;
    });
}

// Überträgt Protokolldaten in ein Dokument.
function augmentSeries(dbItem: ISeries, item: ISeriesData): void {
    dbItem.description = item.description || null;
    dbItem.series = item.parentId || null;
}

// REST Schnittstelle zur Pflege von Serien.
export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addEntity(req.body, seriesCollection, augmentSeries)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findSeries(req.params["id"])))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateEntity(req.params["id"], req.body, seriesCollection, augmentSeries)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], seriesCollection)));
