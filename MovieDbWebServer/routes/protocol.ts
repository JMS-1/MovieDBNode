import { Response } from "express";

export var seriesSeparator = ">";
export var urlMatcher = /https?:\/\/(\w +:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

export interface INamedItem {
    name: string;
}

export interface IIdentifyableItem extends INamedItem {
    id: string;
}

export interface IGenreItem extends INamedItem {
}

export interface IGenreDescription extends IGenreItem, IIdentifyableItem {
}

export interface ILanguageDescription extends IIdentifyableItem {
}

export interface ISeriesDescription extends IIdentifyableItem {
    parentId?: string;

    hierarchicalName: string;
}

export interface IContainerDescription extends IIdentifyableItem {
}

export interface ApplicationInformation {
    empty: boolean;

    total: number;

    languages: ILanguageDescription[];

    genres: IGenreDescription[];

    series: ISeriesDescription[];

    containers: IContainerDescription[];

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

export interface IGenreEdit extends IGenreDescription {
    unused: boolean;
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
