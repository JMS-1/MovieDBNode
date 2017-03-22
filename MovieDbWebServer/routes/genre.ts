﻿import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

import { connect, addName, updateName, findNameWithUnused, deleteName } from '../database/db';
import { genreCollection, IGenre } from '../database/model';

import { IGenreItem, IGenreEdit, sendJson, sendStatus } from './protocol';

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addName(<IGenreItem>req.body, genreCollection)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findNameWithUnused<IGenreEdit, IGenre>(req.params["id"], genreCollection, "genres")))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateName(req.params["id"], <IGenreItem>req.body, genreCollection)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteName(req.params["id"], genreCollection)));
