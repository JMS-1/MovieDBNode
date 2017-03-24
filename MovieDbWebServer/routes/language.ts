import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

import { addEntity, updateEntity, findEntityWithUnused, deleteEntity } from '../database/db';
import { languageCollection, ILanguage } from '../database/model';

import { ILanguageItem, ILanguageEdit, sendJson, sendStatus } from './protocol';

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addEntity(<ILanguageItem>req.body, languageCollection)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findEntityWithUnused<ILanguageEdit, ILanguage>(req.params["id"], languageCollection, "languages")))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateEntity(req.params["id"], <ILanguageItem>req.body, languageCollection)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteEntity(req.params["id"], languageCollection)));
