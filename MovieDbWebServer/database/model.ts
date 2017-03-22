export var mediaCollection = "media";
export var genreCollection = "genres";
export var seriesCollection = "series";
export var languageCollection = "languages";
export var containerCollection = "containers";
export var recordingCollection = "recordings";

export interface IDbName {
    name: string;
}

export interface IDbUnique {
    _id: string;
}

export interface IContainer extends IDbUnique, IDbName {
    type: number;

    description?: string;

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

export interface ILink extends IDbName {
    url: string;

    description?: string;
}

export interface ISeries extends IDbUnique, IDbName {
    description?: string;

    series?: string;
}

export interface IRecording extends IDbUnique, IDbName {
    rentTo?: string;

    created: Date;

    languages: string[];

    genres: string[];

    description?: string;

    media?: string;

    series?: string;

    links: ILink[];
}
