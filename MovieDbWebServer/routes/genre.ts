import { Db } from 'mongodb';
import { Router, Request, Response } from 'express';

import { connect } from '../database/db';
import { genreCollection, IGenre, recordingCollection, IRecording } from '../database/model';

import { IGenreEdit, sendJson } from './protocol';

const router = Router();

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

router.get('/:id', async (req: Request, res: Response) => sendJson(res, await findGenre(req.params["id"])));

export default router;