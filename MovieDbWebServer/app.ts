import * as express from 'express';
import * as parser from 'body-parser';
import * as path from 'path';

import restMain from './routes/app';
import restGenre from './routes/genre';
import restLanguage from './routes/language';
import restDatabase from './routes/recording';
import restContainer from './routes/container';

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(parser.json());

// REST Endpunkte der Anwendung festlegen.
app.use('/movie', restMain);
app.use('/movie/db', restDatabase);
app.use('/movie/genre', restGenre);
app.use('/movie/language', restLanguage);
app.use('/movie/container', restContainer);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`'${req.url}' not found`);

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
