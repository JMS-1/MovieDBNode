﻿import * as express from 'express';
import * as path from 'path';

//import routes from './routes/index';
//import users from './routes/user';

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err['status'] || 500).json({
            message: err.message,
            error: err
        });
    });
}

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err['status'] || 500).json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
