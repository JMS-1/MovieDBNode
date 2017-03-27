import * as express from 'express';
import * as parser from 'body-parser';
import * as path from 'path';

// Alle REST Dienste.
import restMain from './routes/app';
import restGenre from './routes/genre';
import restSeries from './routes/series';
import restLanguage from './routes/language';
import restDatabase from './routes/recording';
import restContainer from './routes/container';

// Web Server initialisieren.
var app = express();

// Zugriff auf den Web Client vorbereiten.
app.use(express.static(path.join(__dirname, 'public')));

// JSON Daten in Anfragen zulassen.
app.use(parser.json());

// REST Endpunkte der Anwendung festlegen.
app.use('/movie', restMain);
app.use('/movie/db', restDatabase);
app.use('/movie/genre', restGenre);
app.use('/movie/series', restSeries);
app.use('/movie/language', restLanguage);
app.use('/movie/container', restContainer);

// Meldung bei nicht gefundener Datei.
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Das macht uns die Fehlersuche etwas einfacher.
    console.log(`'${req.url}' not found`);

    // Standardmeldung erzeugen.
    var err = new Error('Not Found');

    err['status'] = 404;

    next(err);
});

// Allgemeine Fehlerbehandlung.
app.use((err: any, req: express.Request, res: express.Response) => {
    // Damit kann der Client vielleicht etwas anfangen.
    res.status(err['status'] || 500).json({
        message: err.message,
        error: err
    });
});

module.exports = app;
