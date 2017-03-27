import { Db } from 'mongodb';
import { Router, Request, Response } from 'express';

// Datenstrukturen aus der Datenbank.
import { sharedConnection } from '../database/db';
import { IDbUnique, IDbName, languageCollection, ILanguage, genreCollection, IGenre, containerCollection, IContainer, recordingCollection, seriesCollection } from '../database/model';

// Protokollstrukturenund einige Hilfsfunktionen dazu.
import { ApplicationInformation, IDetails, ISeriesFilter, seriesSeparator, hierarchicalNamePipeline, urlMatcher, sendJson } from './protocol';

// Ermittelt alle Dokumente einer Art.
function getNamedEntities(db: Db, collectionName: string): Promise<IDetails[]> {
    // Beim Auslesen nach dem Namen sortieren und direkt in die zugehörige Protokollstruktur wandeln.
    return db.collection(collectionName).find().sort({ name: 1 }).map(i => <IDetails>{ id: i._id, name: i.name }).toArray() as Promise<IDetails[]>;
}

// Ermittelt die Anzahl der Aufzeichnungen.
async function getCount(db: Db): Promise<number> {
    // Eventuell ist die Datenbank noch jungfräulich, dann kennen wir gar keine Aufzeichnungen.
    var allCollections = await db.collections();

    for (var collection of allCollections)
        if (collection.collectionName === recordingCollection)
            return collection.count({});

    // Tatsächlich habe wir die Art der Aufzeichnungen nicht gefunden.
    return new Promise<number>(setResult => setResult(null));
}

// Ermittelt alle Serien.
async function getSeries(db: Db): Promise<ISeriesFilter[]> {
    // Die Serienhierarchie wird vollständig in der Datenbank ausgewertet.
    var series = await db.collection(seriesCollection).aggregate<ISeriesFilter>([
        // Blendet den hierarchischen Namen in das Ergebnis ein.
        ...hierarchicalNamePipeline({}, { name: 1, parentId: "$series" }),

        // Dann lassen wir die Datenbank danach sortieren.
        { $sort: { "hierarchicalName": 1 } }
    ]).toArray();

    return new Promise<ISeriesFilter[]>(setResult => setResult(series));
}

// Ermittelt eine Beschreibung des aktuellen Datenstands.
async function getInfo(): Promise<ApplicationInformation> {
    // Erst einmal die Datenbank selbst.
    var database = await sharedConnection;

    // Dann alle Vorschlagslisten.
    var allSeries = await getSeries(database);
    var allContainers = await getNamedEntities(database, containerCollection);
    var allLanguages = await getNamedEntities(database, languageCollection);
    var allGenres = await getNamedEntities(database, genreCollection);

    // Und noch die Anzahl der Aufzeichnungen.
    var total = await getCount(database);

    // Schön ins Protokoll verpackt - man beachte die Sonderbehandlung der Anzahl der Aufzeichnungen, die auch eine leere Datenbank erkennen hilft.
    return new Promise<ApplicationInformation>(setResult =>
        setResult({
            total: total || 0,
            genres: allGenres,
            series: allSeries,
            empty: total === null,
            languages: allLanguages,
            containers: allContainers,
            urlExpression: urlMatcher.source,
            seriesSeparator: seriesSeparator,
        }));
}

// REST Schnittstelle für die übergreifenenden Informationen zum Datenstand.
export default Router()
    .get('/info', async (req: Request, res: Response) => sendJson(res, await getInfo()));