export var genreCollection = "genres";
export var languageCollection = "languages";
export var containerCollection = "containers";
export var recordingCollection = "recordings";

export interface IContainer {
    _id: number;

    name: string;

    type: number;

    description?: string;

    parentId?: number;

    location?: string;
}

export interface IGenre {
    _id: number;

    name: string;
}

export interface ILanguage {
    _id: number;

    name: string;
}

export interface IRecording {
    _id: number;

    name: string;

    rentTo?: string;

    created: Date;

    languages: number[];

    genres: number[];

    description?: string;

    media?: number;

    series?: number;
}
