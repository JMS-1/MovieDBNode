import * as express from 'express';

import * as rest from './protocol';

function getInfo(): rest.ApplicationInformation {
    return {
        total: 0,
        genres: [],
        series: [],
        empty: false,
        languages: [],
        containers: [],
        seriesSeparator: ">",
        urlExpression: "https?:\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?"
    };
}

const router = express.Router();

router.get('/info', (req: express.Request, res: express.Response) => {
    res.json(getInfo());
});

export default router;