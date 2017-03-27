﻿import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

// Datenbankelemente.
import { addEntity, updateEntity, findEntityWithUnused, deleteEntity } from '../database/db';
import { languageCollection, ILanguage } from '../database/model';

// Protokollstrukturen.
import { ILanguageDetails, sendJson, sendStatus } from './protocol';

// REST Schnittstelle zur Pflege der Sprachen.
export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addEntity(req.body, languageCollection)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findEntityWithUnused<ILanguageDetails, ILanguage>(req.params["id"], languageCollection, "languages")))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateEntity(req.params["id"], req.body, languageCollection)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], languageCollection)));
