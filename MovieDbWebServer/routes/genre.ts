import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

import { connect, addNamedItem, updateNamedItem, findNamedItem, deleteIdentifyableItem } from '../database/db';
import { genreCollection } from '../database/model';

import { IGenreItem, IGenreEdit, sendJson, sendStatus } from './protocol';

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addNamedItem(<IGenreItem>req.body, genreCollection)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findNamedItem<IGenreEdit>(req.params["id"], genreCollection, "genres")))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateNamedItem(req.params["id"], <IGenreItem>req.body, genreCollection)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteIdentifyableItem(req.params["id"], genreCollection)));
