import { Router, Request, Response } from 'express';

import { ISearchRequest, ISearchInformation, sendJson } from './protocol';

const router = Router();

function query(request?: ISearchRequest): Promise<ISearchInformation> {
    if (!request)
        request = {
            order: "hierarchicalName",
            ascending: true,
            genres: [],
            series: [],
            size: 15,
            page: 0,
        };

    return new Promise<ISearchInformation>(setResult => {
        setResult({
            page: 0,
            total: 0,
            genres: [],
            languages: [],
            recordings: [],
            size: request.size
        });
    });
}

router.get('/query', (req: Request, res: Response) => query().then(info => sendJson(res, info)));

router.post('/query', (req: Request, res: Response) => query(req["body"]).then(info => sendJson(res, info)));

export default router;