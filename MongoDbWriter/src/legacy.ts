import { join } from "path";
import { Db } from "mongodb";
import { readFile } from "fs";
import { Promise } from '~mongodb~es6-promise';

import * as model from "./model";

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

function migrateContainer(old: IContainer): model.IContainer {
    return {
        parentId: null,
        name: old.Name,
        type: old.Type,
        _id: ++_containerId,
        location: old.ParentLocation || null,
        description: old.Description || null
    };
}

function migrateGenre(old: IGenre): model.IGenre {
    return { _id: old.Long };
}

function migrateLanguage(old: ILanguage): model.ILanguage {
    return { _id: old.Long };
}

function migrateContainers(old: IContainer[], db: Db): Promise<Db> {
    return db
        .dropCollection(model.containerCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.containerCollection);

            var containers = [];

            var idMap: { [id: string]: model.IContainer; } = {};
            var parentMap: { [id: string]: string; } = {};

            for (var oldContainer of old) {
                var container = migrateContainer(oldContainer);

                idMap[oldContainer.Id] = container;

                if (oldContainer.Parent)
                    parentMap[oldContainer.Id] = oldContainer.Parent;

                containers.push(container);
            }

            for (var id in parentMap)
                if (parentMap.hasOwnProperty(id))
                    idMap[id].parentId = idMap[parentMap[id]]._id;

            return containerCollection.insertMany(containers);
        })
        .then(result => db);
}

function migrateGenres(old: IGenre[], db: Db): Promise<Db> {
    return db
        .dropCollection(model.genreCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.genreCollection);

            var genres = old.map(migrateGenre);

            return containerCollection.insertMany(genres);
        })
        .then(result => db);
}

function migrateLanguages(old: ILanguage[], db: Db): Promise<Db> {
    return db
        .dropCollection(model.languageCollection)
        .then(success => success, error => null)
        .then(success => {
            var containerCollection = db.collection(model.languageCollection);

            var languages = old.map(migrateLanguage);

            return containerCollection.insertMany(languages);
        })
        .then(result => db);
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

                resolve(migrateContainers(dump.Containers || [], db).then(() =>
                    migrateGenres(dump.Genres || [], db)).then(() =>
                        migrateLanguages(dump.Languages || [], db)));
            }
        });
    });
}
