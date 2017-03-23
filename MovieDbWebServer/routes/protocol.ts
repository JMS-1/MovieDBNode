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

export interface ISimpleUsage {
    unused: boolean;
}

export interface ISeriesDescription extends IUnique, IName {
    parentId?: string;

    hierarchicalName: string;
}

export interface IUniqueContainer extends IUnique, IName {
}

export interface ApplicationInformation {
    empty: boolean;

    total: number;

    languages: IUniqueLanguage[];

    genres: IUniqueGenre[];

    series: ISeriesDescription[];

    containers: IUniqueContainer[];

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

export interface IRecordingEditDescription extends IRecordingDescription {
    description: string;

    mediaType: number;

    container?: string;

    location: string;

    links: ILink[];
}

export interface IRecordingEdit extends IRecordingEditDescription {
    id: string;
}

export interface IGenreItem extends IName {
}

export interface IUniqueGenre extends IGenreItem, IUnique {
}

export interface IGenreEdit extends IUniqueGenre, ISimpleUsage {
}

export interface ILanguageItem extends IName {
}

export interface IUniqueLanguage extends ILanguageItem, IUnique {
}

export interface ILanguageEdit extends IUniqueLanguage, ISimpleUsage {
}

export interface IContainerItem extends IName {
}

export interface IUniqueContainer extends IContainerItem, IUnique {
}

export interface IContainerRecording extends IUnique, IName {
    position: string;
}

export interface IContainerEdit extends IUniqueContainer {
    description: string;

    type: number;

    parent?: string;

    location: string;

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

export interface ISeriesMap {
    [series: string]: ISeriesDescription;
}

var seriesLoader: Promise<ISeriesDescription[]>;
var seriesMap: Promise<ISeriesMap>;

export function reloadSeries(): void {
    seriesLoader = undefined;
    seriesMap = undefined;
}

export function getSeries(): Promise<ISeriesDescription[]> {
    if (!seriesLoader)
        seriesLoader = new Promise<ISeriesDescription[]>(async setResult => {
            var db = await sharedConnection;
            var dbSeries = await db.collection(seriesCollection).find<ISeries>().toArray();

            var tree = await db.collection(seriesCollection).aggregate<ISeries & { hierarchy: (ISeries & { order: number; })[]; }>([
                {
                    $graphLookup: {
                        from: seriesCollection,
                        startWith: "$series",
                        connectFromField: "series",
                        connectToField: "_id",
                        depthField: "order",
                        as: "hierarchy"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        series: 1,
                        hierarchy: { order: 1, name: 1 }
                    }
                }
            ]).toArray();

            var series = tree.map(s => {
                s.hierarchy.sort((l, r) => r.order - l.order);

                return <ISeriesDescription>{
                    id: s._id,
                    name: s.name,
                    parentId: s.series || null,
                    hierarchicalName: s.hierarchy.map(p => p.name).concat(s.name).join(` ${seriesSeparator} `)
                };
            });

            series.sort((l, r) => l.hierarchicalName.localeCompare(r.hierarchicalName));

            setResult(series);
        });

    return seriesLoader;
}

export function getSeriesMap(): Promise<ISeriesMap> {
    if (!seriesMap)
        seriesMap = new Promise<ISeriesMap>(async setResult => {
            var series = await getSeries();

            var map: ISeriesMap = {};

            series.forEach(s => map[s.id] = s);

            setResult(map);
        });

    return seriesMap;
}
