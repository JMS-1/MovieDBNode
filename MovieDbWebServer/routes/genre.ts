import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

import { addEntity, updateEntity, findEntityWithUnused, deleteEntity } from '../database/db';
import { genreCollection, IGenre } from '../database/model';

import { IGenreItem, IGenreEdit, sendJson, sendStatus } from './protocol';

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addEntity(<IGenreItem>req.body, genreCollection)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findEntityWithUnused<IGenreEdit, IGenre>(req.params["id"], genreCollection, "genres")))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateEntity(req.params["id"], <IGenreItem>req.body, genreCollection)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], genreCollection)));
