export var mediaCollection = "media";
export var genreCollection = "genres";
export var seriesCollection = "series";
export var languageCollection = "languages";
export var containerCollection = "containers";
export var recordingCollection = "recordings";

export interface IDbName {
    name: string;
}

export interface IDbDescription {
    description?: string;
}

export interface IDbUnique {
    _id: string;
}

export interface IDbInSeries {
    series?: string;
}

export interface IContainer extends IDbUnique, IDbName, IDbDescription {
    type: number;

    container?: string;

    position?: string;
}

export interface IGenre extends IDbUnique, IDbName {
}

export interface ILanguage extends IDbUnique, IDbName {
}

export interface IMedia extends IDbUnique {
    _id: string;

    type: number;

    container?: string;

    position?: string;
}

export interface ILink extends IDbName, IDbDescription {
    url: string;
}

export interface ISeries extends IDbUnique, IDbName, IDbDescription, IDbInSeries {
}

export interface IRecording extends IDbUnique, IDbName, IDbDescription, IDbInSeries {
    rentTo?: string;

    created: Date;

    languages: string[];

    genres: string[];

    media?: string;

    links: ILink[];
}

