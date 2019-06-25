"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const links_1 = require("./links");
const relation_1 = require("./relation");
const container_1 = require("../database/container");
const genre_1 = require("../database/genre");
const language_1 = require("../database/language");
const media_1 = require("../database/media");
const recording_1 = require("../database/recording");
const series_1 = require("../database/series");
const validation_1 = require("../database/validation");
const readFile = util_1.promisify(fs.readFile);
const temp = '\ufeff';
const doubleQuote = /''/g;
const fieldReg = /\[([^\]]+)\]/g;
const insertReg = /^INSERT \[dbo\]\.\[([^\]]+)\] \(([^\)]+)\) VALUES \((.+)\)$/;
const normReg = /(N'([^']|'')*')/g;
const tempOff = new RegExp(temp, 'g');
const tempOn = /,/g;
const genreLinks = new (class extends relation_1.RelationCollection {
})('Genre');
const languageLinks = new (class extends relation_1.RelationCollection {
})('Language');
async function runMigration() {
    validation_1.addSchema(recording_1.LinkSchema);
    validation_1.addSchema(relation_1.RelationSchema);
    const collections = {
        Containers: container_1.containerCollection,
        Genres: genre_1.genreCollection,
        Languages: language_1.languageCollection,
        Links: links_1.linkCollection,
        Media: media_1.mediaCollection,
        RecordingGenres: genreLinks,
        RecordingLanguages: languageLinks,
        Recordings: recording_1.recordingCollection,
        Series: series_1.seriesCollection,
    };
    const path = path_1.join(__dirname, '../../../legacy/all.sql');
    const all = await readFile(path);
    const str = all.toString('UCS2');
    for (let line of str.split('\r\n')) {
        const insert = insertReg.exec(line);
        if (!insert) {
            continue;
        }
        const table = insert[1];
        const collection = collections[table];
        if (!collection) {
            continue;
        }
        const fields = insert[2].split(',').map(f => f.trim().replace(fieldReg, (m, n) => n));
        const data = insert[3].replace(normReg, (m, n) => n.replace(tempOn, temp)).split(',');
        if (fields.length !== data.length) {
            throw new Error(`bad INSERT: ${line}`);
        }
        const row = {};
        for (let i = 0; i < fields.length; i++) {
            const value = data[i].trim().replace(tempOff, ',');
            row[fields[i]] =
                value === 'NULL'
                    ? null
                    : value.charAt(0) === 'N'
                        ? value.substr(2, value.length - 3).replace(doubleQuote, "'")
                        : value;
        }
        await collection.fromSql(row);
    }
    const recordings = recording_1.recordingCollection.migrationMap;
    for (let link of genreLinks.migrated) {
        const recording = recordings[link.from];
        const genre = genre_1.genreCollection.migrationMap[link.to];
        if (!recording) {
            throw new Error(`recording ${link.from} not found`);
        }
        if (!genre) {
            throw new Error(`genre ${link.to} not found`);
        }
        recording.genres.push(genre._id);
    }
    for (let link of languageLinks.migrated) {
        const recording = recordings[link.from];
        const language = language_1.languageCollection.migrationMap[link.to];
        if (!recording) {
            throw new Error(`recording ${link.from} not found`);
        }
        if (!language) {
            throw new Error(`language ${link.to} not found`);
        }
        recording.languages.push(language._id);
    }
    for (let link of Object.values(links_1.linkCollection.migrationMap)) {
        const recording = recordings[link.for];
        if (!recording) {
            throw new Error(`recording ${link.for} not found`);
        }
        if (recording.links[link.ordinal]) {
            throw new Error(`duplicate link ordinal in recording ${link.for}`);
        }
        recording.links[link.ordinal] = { name: link.name, url: link.url };
        if (link.description) {
            recording.links[link.ordinal].description = link.description;
        }
    }
    for (let recording of Object.values(recordings)) {
        const test = validation_1.validate(recording, recording_1.recordingCollection.schema);
        if (test) {
            throw new Error(JSON.stringify(test));
        }
    }
    for (let collection of Object.values(collections)) {
        await collection.migrate();
    }
}
exports.runMigration = runMigration;
//# sourceMappingURL=index.js.map