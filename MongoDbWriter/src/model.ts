export var mediaCollection = "media";
export var genreCollection = "genres";
export var seriesCollection = "series";
export var languageCollection = "languages";
export var containerCollection = "containers";
export var recordingCollection = "recordings";

export interface IContainer {
    _id: string;

    name: string;

    type: number;

    description?: string;

    container?: string;

    position?: string;
}

export interface IGenre {
    _id: string;

    name: string;
}

export interface ILanguage {
    _id: string;

    name: string;
}

export interface ILanguage {
    _id: string;

    name: string;
}

export interface IMedia {
    _id: string;

    type: number;

    container?: string;

    position?: string;
}

export interface ILink {
    url: string;

    name: string;

    description?: string;
}

export interface ISeries {
    _id: string;

    name: string;

    description?: string;

    series?: string;
}

export interface IRecording {
    _id: string;

    name: string;

    rentTo?: string;

    created: Date;

    languages: string[];

    genres: string[];

    description?: string;

    media?: string;

    series?: string;

    links: ILink[];
}
