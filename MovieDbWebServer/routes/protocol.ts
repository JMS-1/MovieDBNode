import { Response } from "express";

export var seriesSeparator = ">";

export interface ILanguageDescription {
    id: string;

    name: string;
}

export interface IGenreDescription {
}

export interface ISeriesDescription {
    id: string;

    name: string;

    parentId?: string;

    hierarchicalName: string;
}

export interface IContainerDescription {
    id: string;

    name: string;
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

export function sendJson<TDataType>(res: Response, data: TDataType): Response {
    return res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate').json(data);
}
