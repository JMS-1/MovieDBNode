export var containerCollection = "containers";
export var genreCollection = "genres";
export var languageCollection = "languages";

export interface IContainer {
    _id: number;

    name: string;

    type: number;

    description?: string;

    parentId?: number;

    location?: string;
}

export interface IGenre {
    _id: string;
}

export interface ILanguage {
    _id: string;
}
