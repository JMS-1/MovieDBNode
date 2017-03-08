import * as express from 'express';

import * as model from '../model/app';

const router = express.Router();

router.get('/info', (req: express.Request, res: express.Response) => {
    res.json(model.getInfo());
});

export default router;