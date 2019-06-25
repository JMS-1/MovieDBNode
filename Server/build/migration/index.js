"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path_1 = require("path");
const util_1 = require("util");
const link_1 = require("./link");
const container_1 = require("../database/container");
const genre_1 = require("../database/genre");
const language_1 = require("../database/language");
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
const genreLinks = new (class extends link_1.LinkCollection {
})('Genre');
const languageLinks = new (class extends link_1.LinkCollection {
})('Language');
async function runMigration() {
    validation_1.addSchema(link_1.LinkSchema);
    const collections = {
        Containers: container_1.containerCollection,
        Genres: genre_1.genreCollection,
        Languages: language_1.languageCollection,
        RecordingGenres: genreLinks,
        RecordingLanguages: languageLinks,
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
}
exports.runMigration = runMigration;

//# sourceMappingURL=index.js.map
