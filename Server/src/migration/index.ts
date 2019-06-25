import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'

import { linkCollection } from './links'
import { RelationCollection, RelationSchema } from './relation'

import { containerCollection } from '../database/container'
import { genreCollection } from '../database/genre'
import { languageCollection } from '../database/language'
import { mediaCollection } from '../database/media'
import { LinkSchema, recordingCollection } from '../database/recording'
import { seriesCollection } from '../database/series'
import { addSchema, validate } from '../database/validation'

const readFile = promisify(fs.readFile)

const temp = '\ufeff'

const doubleQuote = /''/g
const fieldReg = /\[([^\]]+)\]/g
const insertReg = /^INSERT \[dbo\]\.\[([^\]]+)\] \(([^\)]+)\) VALUES \((.+)\)$/
const normReg = /(N'([^']|'')*')/g
const tempOff = new RegExp(temp, 'g')
const tempOn = /,/g

const genreLinks = new (class extends RelationCollection {})('Genre')

const languageLinks = new (class extends RelationCollection {})('Language')

export async function runMigration(): Promise<void> {
    addSchema(LinkSchema)
    addSchema(RelationSchema)

    const collections = {
        Containers: containerCollection,
        Genres: genreCollection,
        Languages: languageCollection,
        Links: linkCollection,
        Media: mediaCollection,
        RecordingGenres: genreLinks,
        RecordingLanguages: languageLinks,
        Recordings: recordingCollection,
        Series: seriesCollection,
    }

    const path = join(__dirname, '../../../legacy/all.sql')
    const all = await readFile(path)
    const str = all.toString('UCS2')

    for (let line of str.split('\r\n')) {
        const insert = insertReg.exec(line)

        if (!insert) {
            continue
        }

        const table = <keyof typeof collections>insert[1]
        const collection = collections[table]

        if (!collection) {
            continue
        }

        const fields = insert[2].split(',').map(f => f.trim().replace(fieldReg, (m, n) => n))
        const data = insert[3].replace(normReg, (m, n) => n.replace(tempOn, temp)).split(',')

        if (fields.length !== data.length) {
            throw new Error(`bad INSERT: ${line}`)
        }

        const row: any = {}

        for (let i = 0; i < fields.length; i++) {
            const value = data[i].trim().replace(tempOff, ',')

            row[fields[i]] =
                value === 'NULL'
                    ? null
                    : value.charAt(0) === 'N'
                    ? value.substr(2, value.length - 3).replace(doubleQuote, "'")
                    : value
        }

        await collection.fromSql(row)
    }

    const recordings = recordingCollection.migrationMap

    for (let link of genreLinks.migrated) {
        const recording = recordings[link.from]
        const genre = genreCollection.migrationMap[link.to]

        if (!recording) {
            throw new Error(`recording ${link.from} not found`)
        }

        if (!genre) {
            throw new Error(`genre ${link.to} not found`)
        }

        recording.genres.push(genre._id)
    }

    for (let link of languageLinks.migrated) {
        const recording = recordings[link.from]
        const language = languageCollection.migrationMap[link.to]

        if (!recording) {
            throw new Error(`recording ${link.from} not found`)
        }

        if (!language) {
            throw new Error(`language ${link.to} not found`)
        }

        recording.languages.push(language._id)
    }

    for (let link of Object.values(linkCollection.migrationMap)) {
        const recording = recordings[link.for]

        if (!recording) {
            throw new Error(`recording ${link.for} not found`)
        }

        if (recording.links[link.ordinal]) {
            throw new Error(`duplicate link ordinal in recording ${link.for}`)
        }

        recording.links[link.ordinal] = { name: link.name, url: link.url }

        if (link.description) {
            recording.links[link.ordinal].description = link.description
        }
    }

    for (let recording of Object.values(recordings)) {
        const test = validate(recording, recordingCollection.schema)

        if (test) {
            throw new Error(JSON.stringify(test))
        }
    }

    for (let collection of Object.values(collections)) {
        await collection.migrate()
    }
}