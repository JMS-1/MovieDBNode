import * as express from 'express';

const router = express.Router();

router.get('/info', (req: express.Request, res: express.Response) => {
    res.json({});
});

export default router;