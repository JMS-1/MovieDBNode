import { Response } from "express";
import { Db } from "mongodb";

// Datenbankelemente.
import { sharedConnection } from "../database/db";
import { seriesCollection, ISeries } from "../database/model";

// Trennzeichen zwischen Ebenen der Serien.
export var seriesSeparator = ">";

// Prüfmuster für Verweise.
export var urlMatcher = /https?:\/\/(\w +:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

// Jede Entitität in der Datenbank hat einen Namen.
export interface IName {
    name: string;
}

// Die eindeutige Kennung einer Eigenschaft wird im Allgemeinen nur beim Auslesen benötigt.
export interface IUnique {
    id: string;
}

// Name und Identität legen die minimale Beschreibung einer Entität zur Pflege fest.
export interface IDetails extends IName, IUnique {
}

// In vielen Fällen gibt es eine zusätzliche Information darüber, ob die Entität gelöschte werden darf.
export interface IEditDetails extends IDetails {
    unused: boolean;
}

// Die Informationen zur Auswahl einer Serie im Suchfilter.
export interface ISeriesFilter extends IDetails {
    // Die übergeordnete Serie - zur Anzeige des Filters als Baum.
    parentId?: string;

    // Der vollständige Name der Serie.
    hierarchicalName: string;
}

// Beschreibt den aktuellen Datenstand.
export interface ApplicationInformation {
    // Gesetzt, wenn die Datenbank noch gar nicht initialisiert wurde.
    empty: boolean;

    // Anzahl von Aufzeichnungen in der Datenbank.
    total: number;

    // Bekannte Sprachen.
    languages: IDetails[];

    // Bekannte Kategorien.
    genres: IDetails[];

    // Bekannte Serien.
    series: ISeriesFilter[];

    // Bekannte Aufbewahrungen.
    containers: IDetails[];

    // Das Trennzeichen zwischen den Ebenen von Serien.
    seriesSeparator: string;

    // Der prüfausdruck für Verweise.
    urlExpression: string;
}

// Daten einer Aufzeichnung, die immer abgefragt werden - insbesondere auch in der Ergebnistabelle.
export interface IRecordingCommonData {
    // Der Name der Aufzeichnung - in einer Tabelle wird der hierarchische Name angezeigt.
    title: string;

    // Der Verleihstand.
    rent: string;

    // Alle Sprachen, in der die Aufzeichnung vorliegt.
    languages: string[];

    // Alle zugeordneten Kategorien.
    genres: string[];

    // Optional die Serie zur Aufzeichnung.
    series?: string;
}

// Beschreibt eine Suchanfrage.
export interface ISearchRequest {
    // Erste anzuzeigende Seitennummer.
    page: number;

    // Anzahl der Aufzeichnungen pro Seite.
    size: number;

    // Eigenschaft, nach der Sortiert werden soll.
    order: string;

    // Sortierordnung.
    ascending: boolean;

    // Zu berücksichtigende Kategorien.
    genres: string[];

    // Optional die zu berücksichtigende Sprache.
    language?: string;

    // Optional die zu berücksichtigende Serie.
    series: string[];

    // Optional eine Ausahl auf den Verleihstand.
    rent?: boolean;

    // Optional eine Inhaltssuche auf den hierarchischen Namen.
    text?: string;
}

// Beschreibt eine Kategorie in einem Suchergebnis.
export interface IGenreSearch extends IUnique {
    // Anzahl der passenden Aufzeichnungen.
    count: number;
}

// Beschreibt eine Sprache in einem Suchergebnis.
export interface ILanguageSearch extends IUnique {
    // Anzahl der passenden Aufzeichnungen.
    count: number;
}

// Beschreibt eine Aufzeichnung in einem Suchergebnis.
export interface IRecordingResult extends IRecordingCommonData, IUnique {
    // Der Zeitpunkt an dem ist Auszeichnung anlegegt wurde - als ISO Zeichenkette.
    createdAsString: string;
}

// Das Ergebnis einer Suche.
export interface ISearchInformation {
    // Die erste angezeigte Seite.
    page: number;

    // Die Anzahl der Aufzeichnungen pro Seite.
    size: number;

    // Die Anzahl aller passender Aufzeichnungen.
    total: number;

    // Die anzuzeigenden Aufzeichnungen.
    recordings: IRecordingResult[];

    // Statistik über die Kategorien.
    genres: IGenreSearch[];

    // Statistik über die Sprachen.
    languages: ILanguageSearch[];
}

// Beschreibt einen Verweis.
export interface ILink extends IName {
    // Der Verweis.
    url: string;

    // Eine optionale Beschreibung des Verweises.
    description?: string;
}

// Beschreibt alle Daten einer Aufzeichnung.
export interface IRecordingData extends IRecordingCommonData {
    // Eine optionale Beschreibung.
    description?: string;

    // Die Art der Aufbewahrung - dieser Wert kann nur der Client interpretieren.
    mediaType: number;

    // Die Aufbewahrung.
    container?: string;

    // Der Standort in der Aufbewahrung.
    location: string;

    // Alle Verweise zur Aufzeichnung.
    links: ILink[];
}

// Daten zur Pflege einer Aufzeichnung.
export interface IRecordingDetails extends IRecordingData, IUnique {
}

// Daten zur Pflege einer Kategorie.
export interface IGenreDetails extends IEditDetails {
}

// Daten zur Pflege einer Sprache.
export interface ILanguageDetails extends IEditDetails {
}

// Informationen zu einer Aufzeichnung in einer Aufbewahrung.
export interface IContainerRecordingDetails extends IDetails {
    // Die Position der Aufzeichnung in der Aufbewahrung.
    position: string;
}

// Eckdaten einer Aufbewahrung.
export interface IContainerData extends IName {
    // Beschreibung.
    description?: string;

    // Art - wird nur vom Client interpretiert.
    type: number;

    // Übergeordnete Aufbewahrung.
    parent?: string;

    // Standort relativ zur übergeordneten Aufbewahrung.
    location: string;
}

// Informationen einer Aufbewahrung zur Pflege.
export interface IContainerDetails extends IContainerData, IUnique {
    // Die Namen aller untergeordneten Aufbewahrungen.
    children: string[];

    // Alle Aufzeichnungen in der Aufbewahrung.
    recordings: IContainerRecordingDetails[];
}

// Die Eckdaten zur Pflege einer Serie.
export interface ISeriesData extends IName {
    // Die übergeorndete Serie.
    parentId?: string;

    // Die Beschreibung der Serie.
    description?: string;
}

// Informationen zur Pflege einer Serie.
export interface ISeriesDetails extends ISeriesData, IEditDetails {
}

// Übermittelt ein Objekt im JSON Format an den Aufrufer.
export function sendJson<TDataType>(res: Response, data: TDataType): void {
    // Als dynamische Methode wird hier niemals eine Vorhaltung durchgeführt.
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate').json(data);
}

// Übermittelt ein Speicherergebnis.
export async function sendStatus(res: Response, process: Promise<boolean>): Promise<void> {
    // Speicherung durchführen.
    var success = await process;

    // Ergebnis übermitteln.
    res.sendStatus(success ? 200 : 400);
    res.end();

    // Leerer Rückgabewert um den Compiler glücklich zu machen.
    return new Promise<void>(setResult => setResult(undefined));
}

// Erweitert eine beliebige Suche um den hierarchischen Namen - die Dokumente müssen lediglich _id, name und series als Eigenschaften besitzen.
export function hierarchicalNamePipeline(group: {}, project: {}): Object[] {
    // Konfiguration der Hierarchiverfolgung.
    var lookup = {
        connectFromField: "series",
        from: seriesCollection,
        connectToField: "_id",
        startWith: "$series",
        depthField: "order",
        as: "hierarchy"
    };

    // Konfiguration für die erneute Zusammenführung.
    group = {
        ...group,
        _id: "$_id",
        name: { $first: "$name" },
        series: { $first: "$series" },
        hierarchy: { $push: "$hierarchy.name" }
    };

    // Konfiguration für die Abbildung auf die Protokollstrukturen.
    project = {
        ...project,
        id: "$_id",
        hierarchicalName: {
            $reduce: {
                input: "$hierarchy",
                initialValue: "$name",
                in: { $concat: ["$$this", ` ${seriesSeparator} `, "$$value"] }
            }
        }
    };

    return [
        // Erst einmal ergänzen wir zu jeder Serie den Kette der übergeordneten Serien.
        { $graphLookup: lookup },

        // Da die Ordnung der übergeordneten Serien nicht garantiert ist müssen wir diese explizit sicherstellen.
        { $unwind: { path: "$hierarchy", preserveNullAndEmptyArrays: true } },
        { $sort: { "hierarchy.order": 1 } },
        { $group: group },

        // Nun können wir die Name der übergeordneten Serien einfach mit dem eigenen Namen kombinieren.
        { $project: project }
    ]
}
