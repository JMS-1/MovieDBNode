// Die Namen unserer Dokumentenarten.
export var mediaCollection = "media";
export var genreCollection = "genres";
export var seriesCollection = "series";
export var languageCollection = "languages";
export var containerCollection = "containers";
export var recordingCollection = "recordings";

// Dokument mit Name.
export interface IDbName {
    // Der Name des Dokumentes.
    name: string;
}

// Dokument mit optionaler Beschreibung.
export interface IDbDescription {
    // Die Beschreibung des Dokumentes.
    description?: string;
}

// Dokument mit eindeutiger Kennung.
export interface IDbUnique {
    // Die eindeutige Kennung des Dokumentes.
    _id: string;
}

// Dokument, das einer Serie zugeordnet werden kann.
export interface IDbInSeries {
    // Die übergeordnete Serie.
    series?: string;
}

// Eine Aufbewahrung.
export interface IContainer extends IDbUnique, IDbName, IDbDescription {
    // Die Art der Aufbewahrung - nur der Client muss wissen, was diese bedeutet!
    type: number;

    // Optional die übergeordnete Aufbewahrung.
    container?: string;

    // Optional der Standort in der übergeordneten Aufbewahrung.
    position?: string;
}

// Eine Kategorie.
export interface IGenre extends IDbUnique, IDbName {
}

// Eine Sprache.
export interface ILanguage extends IDbUnique, IDbName {
}

// Die Referenz in eine Aufbewahrung.
export interface IMedia extends IDbUnique {
    // Die Art der Referenz - nur der Client muss wissen, was diese bedeutet.
    type: number;

    // Optional die Aufbewahrung.
    container?: string;

    // Optional der Standort in der Aufbewahrung.
    position?: string;
}

// Ein Verweise einer Aufzeichnung.
export interface ILink extends IDbName, IDbDescription {
    // Der eigentliche Verweis.
    url: string;
}

// Eine Serie.
export interface ISeries extends IDbUnique, IDbName, IDbDescription, IDbInSeries {
}

// Eine Aufzeichnung.
export interface IRecording extends IDbUnique, IDbName, IDbDescription, IDbInSeries {
    // Optional der Verleihstatus.
    rentTo?: string;

    // Das Datum, an dem die Aufzeichnung angelegt wurde.
    created: Date;

    // Die Sprachen, in der die Aufzeichnung vorliegt.
    languages: string[];

    // Die Kategoriern der Aufzeichnung.
    genres: string[];

    // Optional Informationen zum Standort.
    media?: string;

    // Die Liste der Verweise mit weiteren Informationen zur Aufzeichnung.
    links: ILink[];
}

