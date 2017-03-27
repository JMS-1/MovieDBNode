import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

// Datenbankelemente.
import { addEntity, updateEntity, findEntityWithUnused, deleteEntity } from '../database/db';
import { genreCollection, IGenre } from '../database/model';

// Protokollstrukturen.
import { IGenreDetails, sendJson, sendStatus } from './protocol';

// REST Schnittstelle zur Pflege der Kategorien.
export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addEntity(req.body, genreCollection)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findEntityWithUnused<IGenreDetails, IGenre>(req.params["id"], genreCollection, "genres")))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateEntity(req.params["id"], req.body, genreCollection)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], genreCollection)));
