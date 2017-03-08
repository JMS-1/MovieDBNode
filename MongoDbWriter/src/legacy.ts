import { join } from "path";
import { Db } from "mongodb";
import { readFile } from "fs";
import { Promise } from '~mongodb~es6-promise';

import * as model from "./model";

interface IMap<TEntityType> {
    [id: string]: TEntityType;
}

interface IContainer {
    Id: string;

    Name: string;

    Type: number;

    Description?: string;

    Parent?: string;

    ParentLocation?: string;
}

interface IGenre {
    Id: string;

    Long: string;
}

interface ILanguage {
    Id: string;

    Long: string;
}

interface ILink {
    For: string;

    Url: string;

    Name: string;

    Description?: string;

    Ordinal: number;
}

interface IMedia {
    Id: string;

    Type: number;

    Container?: string;

    Position?: string;
}

interface ISeries {
    Id: string;

    Name: string;

    Description?: string;

    Parent?: string;
}

interface IRecording {
    Id: string;

    Name: string;

    RentTo?: string;

    Created: string;

    Description?: string;

    Media?: string;

    Series?: string;

    HierarchicalName: string;
}

interface IRecordingGenre {
    Genre: string;

    Recording: string;
}

interface IRecordingLanguage {
    Language: string;

    Recording: string;
}

interface IDump {
    Containers: IContainer[];

    Genres: IGenre[];

    Languages: ILanguage[];

    Links: ILink[];

    Media: IMedia[];

    Series: ISeries[];

    Recordings: IRecording[];

    RecordingGenres: IRecordingGenre[];

    RecordingLanguages: IRecordingLanguage[];
}

var _containerId = 0;
var _recordingId = 0;
var _languageId = 0;
var _seriesId = 0;
var _genreId = 0;

function migrateContainer(old: IContainer): model.IContainer {
    return {
        container: null,
        name: old.Name,
        type: old.Type,
        _id: ++_containerId,
        position: old.ParentLocation || null,
        description: old.Description || null
    };
}

function migrateSeries(old: ISeries): model.ISeries {
    return {
        series: null,
        name: old.Name,
        _id: ++_seriesId,
        description: old.Description || null
    };
}

function migrateGenre(old: IGenre): model.IGenre {
    return {
        _id: ++_genreId,
        name: old.Long
    };
}

function migrateLanguage(old: ILanguage): model.ILanguage {
    return {
        _id: ++_languageId,
        name: old.Long
    };
}

function migrateMedia(old: IMedia, containers: IMap<model.IContainer>): model.IMedia {
    return {
        type: old.Type,
        _id: ++_languageId,
        position: old.Position,
        container: ((old.Container && containers[old.Container]) || { _id: null })._id
    };
}

function migrateLink(old: ILink): model.ILink {
    return {
        url: old.Url,
        name: old.Name,
        description: old.Description || null
    };
}

function migrateRecording(old: IRecording, genres: IMap<model.IGenre[]>, languages: IMap<model.ILanguage[]>, links: IMap<model.ILink[]>, media: IMap<model.IMedia>, series: IMap<model.ISeries>): model.IRecording {
    return {
        name: old.Name,
        _id: ++_recordingId,
        links: links[old.Id] || [],
        rentTo: old.RentTo || null,
        created: new Date(old.Created),
        description: old.Description || null,
        genres: (genres[old.Id] || []).map(g => g._id),
        languages: (languages[old.Id] || []).map(l => l._id),
        media: ((old.Media && media[old.Media]) || { _id: null })._id,
        series: ((old.Series && series[old.Series]) || { _id: null })._id
    };
}

function migrateContainers(old: IContainer[], db: Db): Promise<IMap<model.IContainer>> {
    var containers: model.IContainer[] = [];
    var containerMap: IMap<model.IContainer> = {};

    return db
        .dropCollection(model.containerCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.containerCollection);

            var parentMap: { [id: string]: string; } = {};

            for (var oldContainer of old) {
                var container = migrateContainer(oldContainer);

                containerMap[oldContainer.Id] = container;

                if (oldContainer.Parent)
                    parentMap[oldContainer.Id] = oldContainer.Parent;

                containers.push(container);
            }

            for (var id in parentMap)
                if (parentMap.hasOwnProperty(id))
                    containerMap[id].container = containerMap[parentMap[id]]._id;

            return containerCollection.insertMany(containers);
        })
        .then(result => containerMap);
}

function migrateSerieses(old: ISeries[], db: Db): Promise<IMap<model.ISeries>> {
    var serieses: model.ISeries[] = [];
    var seriesMap: IMap<model.ISeries> = {};

    return db
        .dropCollection(model.seriesCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.seriesCollection);

            var parentMap: { [id: string]: string; } = {};

            for (var oldSeries of old) {
                var series = migrateSeries(oldSeries);

                seriesMap[oldSeries.Id] = series;

                if (oldSeries.Parent)
                    parentMap[oldSeries.Id] = oldSeries.Parent;

                serieses.push(series);
            }

            for (var id in parentMap)
                if (parentMap.hasOwnProperty(id))
                    seriesMap[id].series = seriesMap[parentMap[id]]._id;

            return containerCollection.insertMany(serieses);
        })
        .then(result => seriesMap);
}

function migrateGenres(old: IGenre[], db: Db): Promise<IMap<model.IGenre>> {
    var genres: model.IGenre[] = [];
    var genreMap: IMap<model.IGenre> = {};

    return db
        .dropCollection(model.genreCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.genreCollection);

            for (var oldGenre of old)
                genres.push(genreMap[oldGenre.Id] = migrateGenre(oldGenre));

            return containerCollection.insertMany(genres);
        })
        .then(result => genreMap);
}

function migrateLanguages(old: ILanguage[], db: Db): Promise<IMap<model.ILanguage>> {
    var languages: model.ILanguage[] = []
    var languageMap: IMap<model.ILanguage> = {};

    return db
        .dropCollection(model.languageCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.languageCollection);

            for (var oldLanguage of old)
                languages.push(languageMap[oldLanguage.Id] = migrateLanguage(oldLanguage));

            return containerCollection.insertMany(languages);
        })
        .then(result => languageMap);
}

function migrateMedias(old: IMedia[], containers: IMap<model.IContainer>, db: Db): Promise<IMap<model.IMedia>> {
    var media: model.IMedia[] = []
    var mediaMap: IMap<model.IMedia> = {};

    return db
        .dropCollection(model.mediaCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.mediaCollection);

            for (var oldMedia of old)
                media.push(mediaMap[oldMedia.Id] = migrateMedia(oldMedia, containers));

            return containerCollection.insertMany(media);
        })
        .then(result => mediaMap);
}

function migrateRecordings(old: IRecording[], genres: IMap<model.IGenre[]>, languages: IMap<model.ILanguage[]>, links: IMap<model.ILink[]>, media: IMap<model.IMedia>, series: IMap<model.ISeries>, db: Db): Promise<model.IRecording[]> {
    var recordings = old.map(r => migrateRecording(r, genres, languages, links, media, series));

    return db
        .dropCollection(model.recordingCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.recordingCollection);

            return containerCollection.insertMany(recordings);
        })
        .then(result => recordings);
}

export function migrate(db: Db): Promise<Db> {
    var promiseFactory: any = global.Promise;

    return new promiseFactory((resolve, reject) => {
        var dump = join(__dirname, "..", "..", "LocalDbReader", "Movie.json");

        readFile(dump, "UTF-8", (error, content) => {
            if (error)
                reject(error);
            else {
                var dump: IDump = JSON.parse(content);

                resolve(migrateContainers(dump.Containers || [], db).then(allContainers =>
                    migrateSerieses(dump.Series || [], db).then(allSeries =>
                        migrateGenres(dump.Genres || [], db).then(allGenres =>
                            migrateLanguages(dump.Languages || [], db).then(allLanguages =>
                                migrateMedias(dump.Media || [], allContainers, db).then(allMedia => {
                                    var linkMapping: IMap<model.ILink[]> = {};
                                    var genreMapping: IMap<model.IGenre[]> = {};
                                    var languageMapping: IMap<model.ILanguage[]> = {};

                                    if (dump.RecordingGenres)
                                        for (var genre of dump.RecordingGenres) {
                                            let mapping = genreMapping[genre.Recording];

                                            if (!mapping)
                                                genreMapping[genre.Recording] = mapping = [];

                                            mapping.push(allGenres[genre.Genre]);
                                        }

                                    if (dump.RecordingLanguages)
                                        for (var language of dump.RecordingLanguages) {
                                            let mapping = languageMapping[language.Recording];

                                            if (!mapping)
                                                languageMapping[language.Recording] = mapping = [];

                                            mapping.push(allLanguages[language.Language]);
                                        }

                                    if (dump.Links)
                                        for (var link of dump.Links) {
                                            let mapping = linkMapping[link.For];

                                            if (!mapping)
                                                linkMapping[link.For] = mapping = [];

                                            mapping[link.Ordinal] = migrateLink(link);
                                        }

                                    return migrateRecordings(dump.Recordings || [], genreMapping, languageMapping, linkMapping, allMedia, allSeries, db).then(allRecordings => db);
                                }))))));
            }
        });
    });
}
