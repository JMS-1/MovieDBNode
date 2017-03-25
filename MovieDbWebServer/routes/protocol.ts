import { Response } from "express";

import { sharedConnection } from "../database/db";
import { seriesCollection, ISeries } from "../database/model";

export var seriesSeparator = ">";
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

export interface ApplicationInformation {
    empty: boolean;

    total: number;

    languages: IDetails[];

    genres: IDetails[];

    series: ISeriesFilter[];

    containers: IDetails[];

    seriesSeparator: string;

    urlExpression: string;
}

export interface IRecordingCommonData {
    title: string;

    rent: string;

    languages: string[];

    genres: string[];

    series?: string;
}

export interface ISearchRequest {
    page: number;

    size: number;

    order: string;

    ascending: boolean;

    genres: string[];

    language?: string;

    series: string[];

    rent?: boolean;

    text?: string;
}

export interface IGenreSearch {
    id: string;

    count: number;
}

export interface ILanguageSearch {
    id: string;

    count: number;
}

export interface IRecordingResult extends IRecordingCommonData {
    id: string;

    createdAsString: string;
}

export interface ISearchInformation {
    page: number;

    size: number;

    total: number;

    recordings: IRecordingResult[];

    genres: IGenreSearch[];

    languages: ILanguageSearch[];
}

export interface ILink {
    name: string;

    url: string;

    description: string;
}

export interface IRecordingData extends IRecordingCommonData {
    description: string;

    mediaType: number;

    container?: string;

    location: string;

    links: ILink[];
}

export interface IRecordingDetails extends IRecordingData {
    id: string;
}

export interface IGenreDetails extends IEditDetails {
}

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

    // Art.
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

export function sendJson<TDataType>(res: Response, data: TDataType): Response {
    return res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate').json(data);
}

export async function sendStatus(res: Response, process: Promise<boolean>): Promise<void> {
    var success = await process;

    res.sendStatus(success ? 200 : 400);
    res.end();

    return new Promise<void>(setResult => setResult(undefined));
}

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

export async function getSeries(): Promise<ISeriesFilter[]> {
    var db = await sharedConnection;

    // Die Serienhierarchie wird vollständig in der Datenbank ausgewertet.
    var series = await db.collection(seriesCollection).aggregate<ISeriesFilter>([
        // Blendet den hierarchischen Namen in das Ergebnis ein.
        ...hierarchicalNamePipeline({}, { name: 1, parentId: "$series" }),

        // Dann lassen wir die Datenbank danach sortieren.
        { $sort: { "hierarchicalName": 1 } }
    ]).toArray();

    return new Promise<ISeriesFilter[]>(setResult => setResult(series));
}
