"use strict";
const path_1 = require("path");
const fs_1 = require("fs");
const model = require("./model");
function migrateContainer(old) {
    return {
        _id: old.Id,
        name: old.Name,
        type: old.Type,
        container: null,
        position: old.ParentLocation || null,
        description: old.Description || null
    };
}
function migrateSeries(old) {
    return {
        _id: old.Id,
        series: null,
        name: old.Name,
        description: old.Description || null
    };
}
function migrateGenre(old) {
    return {
        name: old.Long,
        _id: old.Id
    };
}
function migrateLanguage(old) {
    return {
        name: old.Long,
        _id: old.Id
    };
}
function migrateMedia(old, containers) {
    return {
        _id: old.Id,
        type: old.Type,
        position: old.Position,
        container: ((old.Container && containers[old.Container]) || { _id: null })._id
    };
}
function migrateLink(old) {
    return {
        url: old.Url,
        name: old.Name,
        description: old.Description || null
    };
}
function migrateRecording(old, genres, languages, links, media, series) {
    return {
        _id: old.Id,
        name: old.Name,
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
function migrateContainers(old, db) {
    var containers = [];
    var containerMap = {};
    return db
        .dropCollection(model.containerCollection)
        .then(success => success, error => null)
        .then(success => {
        var containerCollection = db.collection(model.containerCollection);
        var parentMap = {};
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
function migrateSerieses(old, db) {
    var serieses = [];
    var seriesMap = {};
    return db
        .dropCollection(model.seriesCollection)
        .then(success => success, error => null)
        .then(success => {
        var containerCollection = db.collection(model.seriesCollection);
        var parentMap = {};
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
function migrateMedias(old, containers, db) {
    var media = [];
    var mediaMap = {};
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
function migrateRecordings(old, genres, languages, links, media, series, db) {
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
function migrate(db) {
    var promiseFactory = global.Promise;
    return new promiseFactory((resolve, reject) => {
        var dump = path_1.join(__dirname, "..", "..", "LocalDbReader", "Movie.json");
        fs_1.readFile(dump, "UTF-8", (error, content) => {
            if (error)
                reject(error);
            else {
                var dump = JSON.parse(content);
                resolve(migrateContainers(dump.Containers || [], db).then(allContainers => migrateSerieses(dump.Series || [], db).then(allSeries => migrateGenres(dump.Genres || [], db).then(allGenres => migrateLanguages(dump.Languages || [], db).then(allLanguages => migrateMedias(dump.Media || [], allContainers, db).then(allMedia => {
                    var linkMapping = {};
                    var genreMapping = {};
                    var languageMapping = {};
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
exports.migrate = migrate;
//# sourceMappingURL=legacy.js.map