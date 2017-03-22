import { Router, Request, Response } from 'express';
import { Parsed } from 'body-parser';

import { connect, addName, updateName, findName, deleteName } from '../database/db';
import { languageCollection } from '../database/model';

import { ILanguageItem, ILanguageEdit, sendJson, sendStatus } from './protocol';

export default Router()
    .post('/', (req: Request & Parsed, res: Response) => sendStatus(res, addName(<ILanguageItem>req.body, languageCollection)))
    .get('/:id', async (req: Request, res: Response) => sendJson(res, await findName<ILanguageEdit>(req.params["id"], languageCollection, "languages")))
    .put('/:id', (req: Request & Parsed, res: Response) => sendStatus(res, updateName(req.params["id"], <ILanguageItem>req.body, languageCollection)))
    .delete('/:id', (req: Request, res: Response) => sendStatus(res, deleteName(req.params["id"], languageCollection)));
