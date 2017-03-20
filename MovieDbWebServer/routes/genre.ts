import { Db } from 'mongodb';
import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';
import * as uuid from 'uuid/v4';

import { connect } from '../database/db';
import { genreCollection, IGenre, recordingCollection, IRecording } from '../database/model';

import { IGenreItem, IGenreDescription, IGenreEdit, sendJson, sendStatus } from './protocol';

const router = Router();

async function ensureIndex(db: Db): Promise<string> {
    return db.collection(genreCollection).createIndex({ name: 1 }, { name: `${genreCollection}_Unique`, unique: true });
}

async function findGenre(id: string): Promise<IGenreEdit> {
    var db = await connect();
    var genre: IGenre = await db.collection(genreCollection).findOne({ _id: id });
    var genreUser: IRecording = await db.collection(recordingCollection).findOne({ genres: { $elemMatch: { $eq: genre._id } } });

    return new Promise<IGenreEdit>(setResult => setResult({
        id: genre._id,
        name: genre.name,
        unused: !genreUser
    }));
}

async function addGenre(genre: IGenreItem): Promise<boolean> {
    var newGenre: IGenre = { name: genre.name, _id: uuid() };

    var db = await connect();
    var index = await ensureIndex(db);
    var result = await db.collection(genreCollection).insertOne(newGenre);

    return new Promise<boolean>(setResult => setResult(result.insertedCount === 1));
}

async function updateGenre(id: string, genre: IGenreItem): Promise<boolean> {
    var newGenre: IGenreItem = { name: genre.name };

    var db = await connect();
    var index = await ensureIndex(db);
    var result = await db.collection(genreCollection).updateOne({ _id: id }, { $set: newGenre });

    return new Promise<boolean>(setResult => setResult(result.matchedCount === 1));
}

async function deleteGenre(id: string): Promise<boolean> {
    var db = await connect();
    var result = await db.collection(genreCollection).deleteOne({ _id: id });

    return new Promise<boolean>(setResult => setResult(result.deletedCount === 1));
}

router.get('/:id', async (req: Request, res: Response) => sendJson(res, await findGenre(req.params["id"])));

router.post('/', async (req: Request & Parsed, res: Response) => sendStatus(res, addGenre(req.body)));

router.delete('/:id', async (req: Request, res: Response) => sendStatus(res, deleteGenre(req.params["id"])));

router.put('/:id', async (req: Request & Parsed, res: Response) => sendStatus(res, updateGenre(req.params["id"], req.body)));

export default router;