export interface ILanguageDescription {
}

export interface IGenreDescription {
}

export interface ISeriesDescription {
}

export interface IContainerDescription {
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
