"use strict";
const path_1 = require("path");
const fs_1 = require("fs");
const model = require("./model");
var _containerId = 0;
var _recordingId = 0;
var _genreId = 0;
var _languageId = 0;
function migrateContainer(old) {
    return {
        parentId: null,
        name: old.Name,
        type: old.Type,
        _id: ++_containerId,
        location: old.ParentLocation || null,
        description: old.Description || null
    };
}
function migrateGenre(old) {
    return {
        _id: ++_genreId,
        name: old.Long
    };
}
function migrateLanguage(old) {
    return {
        _id: ++_languageId,
        name: old.Long
    };
}
function migrateRecording(old, genres, languages) {
    return {
        name: old.Name,
        _id: ++_recordingId,
        rentTo: old.RentTo || null,
        created: new Date(old.Created),
        description: old.Description || null,
        genres: (genres[old.Id] || []).map(g => g._id),
        languages: (languages[old.Id] || []).map(l => l._id),
    };
}
function migrateContainers(old, db) {
    var containers = [];
    return db
        .dropCollection(model.containerCollection)
        .then(success => success, error => null)
        .then(success => {
        var containerCollection = db.collection(model.containerCollection);
        var idMap = {};
        var parentMap = {};
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
        .then(result => containers);
}
function migrateGenres(old, db) {
    var genres = [];
    var genreMap = {};
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
function migrateLanguages(old, db) {
    var languages = [];
    var languageMap = {};
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
function migrateRecordings(old, genres, languages, db) {
    var recordings = old.map(r => migrateRecording(r, genres, languages));
    return db
        .dropCollection(model.recordingCollection)
        .then(success => success, error => null)
        .then(success => {
        var containerCollection = db.collection(model.recordingCollection);
        return containerCollection.insertMany(recordings);
    })
        .then(result => recordings);
}
function migrate(db) {
    var promiseFactory = global.Promise;
    return new promiseFactory((resolve, reject) => {
        var dump = path_1.join(__dirname, "..", "..", "LocalDbReader", "Movie.json");
        fs_1.readFile(dump, "UTF-8", (error, content) => {
            if (error)
                reject(error);
            else {
                var dump = JSON.parse(content);
                resolve(migrateContainers(dump.Containers || [], db).then(allContainers => migrateGenres(dump.Genres || [], db).then(allGenres => migrateLanguages(dump.Languages || [], db).then(allLanguages => {
                    var genreMapping = {};
                    var languageMapping = {};
                    if (dump.RecordingGenres)
                        for (var genre of dump.RecordingGenres) {
                            var mapping = genreMapping[genre.Recording];
                            if (!mapping)
                                genreMapping[genre.Recording] = mapping = [];
                            mapping.push(allGenres[genre.Genre]);
                        }
                    if (dump.RecordingLanguages)
                        for (var language of dump.RecordingLanguages) {
                            var mapping = languageMapping[language.Recording];
                            if (!mapping)
                                languageMapping[language.Recording] = mapping = [];
                            mapping.push(allLanguages[language.Language]);
                        }
                    return migrateRecordings(dump.Recordings || [], genreMapping, languageMapping, db).then(allRecordings => db);
                }))));
            }
        });
    });
}
exports.migrate = migrate;
//# sourceMappingURL=legacy.js.map