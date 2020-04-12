"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const isxs_validation_1 = require("@jms-1/isxs-validation");
const fs = __importStar(require("fs"));
const path_1 = require("path");
const util_1 = require("util");
const links_1 = require("./links");
const media_1 = require("./media");
const relation_1 = require("./relation");
const container_1 = require("../database/container");
const genre_1 = require("../database/genre");
const language_1 = require("../database/language");
const recording_1 = require("../database/recording");
const series_1 = require("../database/series");
const readFile = util_1.promisify(fs.readFile);
const genreLinks = new (class extends relation_1.RelationCollection {
})('Genre');
const languageLinks = new (class extends relation_1.RelationCollection {
})('Language');
async function runMigration() {
    isxs_validation_1.addSchema(links_1.MigrateLinkSchema);
    isxs_validation_1.addSchema(media_1.MigrateMediaSchema);
    isxs_validation_1.addSchema(relation_1.RelationSchema);
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
    const valueTest = "(NULL|N'([^']|'')*'|\\d+|CAST\\([^\\)]+\\))";
    const valuesTest = `${valueTest}(, ${valueTest})*`;
    const insertTest = `^INSERT \\[dbo\\]\\.\\[([^\\]]+)\\] \\(([^\\)]+)\\) VALUES \\((${valuesTest})\\)$`;
    const insertReg = new RegExp(insertTest, 'gm');
    for (let count = 0;; ++count) {
        const insert = insertReg.exec(str);
        if (!insert) {
            const expected = str.split('\r\n').filter(s => s.startsWith('INSERT ')).length;
            if (expected !== count) {
                throw new Error(`migration count mismatch, expected ${expected} but got ${count}`);
            }
            break;
        }
        const table = insert[1];
        const collection = collections[table];
        if (!collection) {
            continue;
        }
        const fields = [];
        const fieldReg = /\[([^\]]+)\](, )?/g;
        for (let field; (field = fieldReg.exec(insert[2]));) {
            fields.push(field[1]);
        }
        const values = [];
        const valueReg = new RegExp(`${valueTest}(, )?`, 'g');
        for (let value; (value = valueReg.exec(insert[3]));) {
            values.push(value[1]);
        }
        if (fields.length !== values.length) {
            throw new Error(`bad INSERT: ${insert[0]} ${insert[1]} ${insert[2]}`);
        }
        const quoteReg = /''/g;
        const row = {};
        for (let i = 0; i < fields.length; i++) {
            const value = values[i];
            row[fields[i]] =
                value === 'NULL'
                    ? null
                    : value.charAt(0) === 'N'
                        ? value.substr(2, value.length - 3).replace(quoteReg, "'")
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
    const mediaMigrationMap = recording_1.recordingCollection.mediaMigration;
    const mediaMap = media_1.mediaCollection.migrationMap;
    for (let recording of Object.values(recordings)) {
        const media = mediaMap[mediaMigrationMap[recording._id]];
        if (!media) {
            throw new Error(`no media information for ${recording._id}`);
        }
        recording.containerType = media.type;
        if (media.containerId) {
            recording.containerId = media.containerId;
        }
        if (media.position) {
            recording.containerPosition = media.position;
        }
        const test = isxs_validation_1.validate(recording, recording_1.recordingCollection.schema);
        if (test) {
            throw new Error(JSON.stringify(test));
        }
    }
    for (let collection of Object.values(collections)) {
        await collection.migrate();
    }
    await series_1.seriesCollection.refreshFullNames(null);
    await recording_1.recordingCollection.refreshFullNames({});
}
exports.runMigration = runMigration;

//# sourceMappingURL=index.js.map
