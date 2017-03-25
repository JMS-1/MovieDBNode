import { MongoClient, Db, IndexOptions } from 'mongodb';
import { readFile } from 'fs';

import * as uuid from 'uuid/v4';

// Die eigenen Datenbankentitäten.
import { recordingCollection, seriesCollection, IDbUnique, IDbName } from "./model";

// Die Entsprechung im REST Protokoll.
import { IName, IDetails, IEditDetails } from "../routes/protocol";

// Die Konfigurationsdaten zum Zugriff auf die Datenbank.
export interface IDatabaseConfiguration {
    // Name des MongoDb Rechners.
    server: string;

    // Port für den Zugriff auf den MongoDb Rechner.
    port: number;

    // Name der zu verwendenden Datennbank.
    database: string;
}

// Die Konfiguration der Anwendung, geladen aus der Datei config.json im virtuellen Verzeichnis.
export interface IConfiguration {
    mongo: IDatabaseConfiguration;
}

// Ruft die aktuelle Konfiguration ab - diese wird einmalig aus der Datei config.json im virtuellen Verzeichnis geladen.
export var configuration = new Promise<IConfiguration>(setResult => readFile("config.json", "utf8", (err, data) => setResult(JSON.parse(data.substring(1)))));

// Ermittelt einen Zugang zur Datenbank.
async function connectPromise(): Promise<Db> {
    var config = await configuration;

    return MongoClient.connect(`mongodb://${config.mongo.server}:${config.mongo.port}/${config.mongo.database}`);
}

// Meldet den globalen Zugang zur Datenbank.
export var sharedConnection = connectPromise();

// Erstellt einen einfachen Index auf dem Namen einer Dokumentenart.
async function ensureNameIndex(collection: string): Promise<Db> {
    var db = await sharedConnection;

    // Für die Serien müssen wir das etwas anders machen.
    var index: { name: number; series?: number; } = { name: 1 };

    if (collection === seriesCollection)
        index.series = 1;

    // Der Name muss eindeutig sein [TODO: collation einstellen!]
    var options: IndexOptions = { name: `${collection}_Unique`, unique: true };

    // Index anlegen.
    await db.collection(collection).createIndex(index, options);

    // Als Ergebnis melden wir die Datenbankverbindung.
    return new Promise<Db>(setResult => setResult(db));
}

// Löscht irgendein Dokument.
export async function deleteEntity(id: string, collection: string): Promise<boolean> {
    // Datenbankverbindung ermitteln.
    var db = await sharedConnection;

    // Dokument löschen.
    var result = await db.collection(collection).deleteOne({ _id: id });

    // Ergebnis melden.
    return new Promise<boolean>(setResult => setResult(result.deletedCount === 1));
}

// Legt ein Dokument an.
export async function addEntity<TRequestType extends IName, TDatabaseType extends IDbUnique & IDbName>(item: TRequestType, collection: string, fill?: (dbItem: TDatabaseType, item: TRequestType) => void): Promise<boolean> {
    // Gemeinsame Daten eintragen.
    var newItem = <TDatabaseType>{ name: item.name || null, _id: uuid() };

    // Eventuell Sonderdaten ergänzen.
    if (fill)
        fill(newItem, item);

    // Datenbankzugriff abrufen und eventuell Index erstellen.
    var db = await ensureNameIndex(collection);

    // Dokument anlegen.
    var result = await db.collection(collection).insertOne(newItem);

    // Ergebnis melden.
    return new Promise<boolean>(setResult => setResult(result.insertedCount === 1));
}

// Aktualisiert die Daten eines Dokumentes.
export async function updateEntity<TRequestType extends IName, TDatabaseType extends IDbUnique & IDbName>(id: string, item: TRequestType, collection: string, fill?: (dbItem: TDatabaseType, item: TRequestType) => void): Promise<boolean> {
    // Aktualisierte Kerndaten.
    var newItem = <TDatabaseType>{ name: item.name || null };

    // Eventuell Sonderdaten ergänzen.
    if (fill)
        fill(newItem, item);

    // Datenbankzugriff abrufen und eventuell Index erstellen.
    var db = await ensureNameIndex(collection);

    // Dokument aktualisieren.
    var result = await db.collection(collection).updateOne({ _id: id }, { $set: newItem });

    // Ergebnis melden.
    return new Promise<boolean>(setResult => setResult(result.matchedCount === 1));
}

// Schlägt ein Dokument nach.
export async function findEntity<TResultType extends IDetails, TDatabaseType extends IDbUnique & IDbName>(id: string, collection: string, fillUsage: (db: Db, item: TResultType, rawItem: TDatabaseType) => Promise<void>): Promise<TResultType> {
    // Datenbankzugriff abrufen und eventuell Index erstellen.
    var db = await ensureNameIndex(collection);

    // Existierendes Dokument ermitteln.
    var item: TDatabaseType = await db.collection(collection).findOne({ _id: id });

    // Ergebnis vorbereiten.
    var result = <TResultType>{ id: item._id, name: item.name };

    // Individuelle Ergebnisdaten übernehmen.
    await fillUsage(db, result, item);

    // Ergebnis im Protokollformat melden.
    return new Promise<TResultType>(setResult => setResult(result));
}

// Schlägt ein Dokument nach und prüft, ob dieses durch eine Aufzeichnung referenziert wird.
export function findEntityWithUnused<TResultType extends IEditDetails, TDatabaseType extends IDbUnique & IDbName>(id: string, collection: string, usage: string): Promise<TResultType> {
    return findEntity<TResultType, TDatabaseType>(id, collection, async (db, result, item) => {
        // Diese einfache Prüfung funktioniert für Kategorien und Sprachen, bei Aufbewahrungen und Serien ist das etwas aufwändiger.
        result.unused = !await db.collection(recordingCollection).findOne({ [usage]: { $elemMatch: { $eq: result.id } } });
    });
}
