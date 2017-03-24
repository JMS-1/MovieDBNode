import { Response } from "express";

import { sharedConnection } from "../database/db";
import { seriesCollection, ISeries } from "../database/model";

export var seriesSeparator = ">";
export var urlMatcher = /https?:\/\/(\w +:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export interface IName {
    name: string;
}

export interface IUnique {
    id: string;
}

export interface INamedEntity extends IName, IUnique {
}

export interface ISimpleUsage {
    unused: boolean;
}

export interface ISeriesDescription extends INamedEntity {
    parentId?: string;

    hierarchicalName: string;
}

export interface ApplicationInformation {
    empty: boolean;

    total: number;

    languages: INamedEntity[];

    genres: INamedEntity[];

    series: ISeriesDescription[];

    containers: INamedEntity[];

    seriesSeparator: string;

    urlExpression: string;
}

export interface IRecordingDescription {
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

export interface IGenreSearchInformation {
    id: string;

    count: number;
}

export interface ILanguageSearchInformation {
    id: string;

    count: number;
}

export interface ISearchResultInformation extends IRecordingDescription {
    id: string;

    createdAsString: string;
}

export interface ISearchInformation {
    page: number;

    size: number;

    total: number;

    recordings: ISearchResultInformation[];

    genres: IGenreSearchInformation[];

    languages: ILanguageSearchInformation[];
}

export interface ILink {
    name: string;

    url: string;

    description: string;
}

export interface IRecordingData extends IRecordingDescription {
    description: string;

    mediaType: number;

    container?: string;

    location: string;

    links: ILink[];
}

export interface IRecordingDetails extends IRecordingData {
    id: string;
}

export interface IGenreDetails extends INamedEntity, ISimpleUsage {
}

export interface ILanguageDetails extends INamedEntity, ISimpleUsage {
}

export interface IContainerRecording extends INamedEntity {
    position: string;
}

export interface IContainerData extends IName {
    description: string;

    type: number;

    parent?: string;

    location: string;
}

export interface IContainerDetails extends IContainerData, IUnique {
    children: string[];

    recordings: IContainerRecording[];
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

var seriesLoader: Promise<ISeriesDescription[]>;

export function reloadSeries(): void {
    seriesLoader = undefined;
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

export function getSeries(): Promise<ISeriesDescription[]> {
    if (!seriesLoader)
        seriesLoader = new Promise<ISeriesDescription[]>(async setResult => {
            var db = await sharedConnection;

            // Die Serienhierarchie wird vollständig in der Datenbank ausgewertet.
            var series = await db.collection(seriesCollection).aggregate<ISeriesDescription>([
                // Blendet den hierarchischen Namen in das Ergebnis ein.
                ...hierarchicalNamePipeline({ name: { $first: "$name" } }, { name: 1, parentId: "$series" }),

                // Dann lassen wir die Datenbank danach sortieren.
                { $sort: { "hierarchicalName": 1 } }
            ]).toArray();

            setResult(series);
        });

    return seriesLoader;
}
