import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'

import { linkCollection } from './links'
import { mediaCollection } from './media'
import { RelationCollection, RelationSchema } from './relation'

import { containerCollection } from '../database/container'
import { genreCollection } from '../database/genre'
import { languageCollection } from '../database/language'
import { recordingCollection } from '../database/recording'
import { seriesCollection } from '../database/series'
import { addSchema, validate } from '../database/validation'

const readFile = promisify(fs.readFile)

const genreLinks = new (class extends RelationCollection {})('Genre')

const languageLinks = new (class extends RelationCollection {})('Language')

export async function runMigration(): Promise<void> {
    addSchema(linkCollection.schema)
    addSchema(mediaCollection.schema)
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

    const valueTest = "(NULL|N'([^']|'')*'|\\d+|CAST\\([^\\)]+\\))"
    const valuesTest = `${valueTest}(, ${valueTest})*`
    const insertTest = `^INSERT \\[dbo\\]\\.\\[([^\\]]+)\\] \\(([^\\)]+)\\) VALUES \\((${valuesTest})\\)$`
    const insertReg = new RegExp(insertTest, 'gm')

    for (let count = 0; ; ++count) {
        const insert = insertReg.exec(str)

        if (!insert) {
            const expected = str.split('\r\n').filter(s => s.startsWith('INSERT ')).length

            if (expected !== count) {
                throw new Error(`migration count mismatch, expected ${expected} but got ${count}`)
            }

            break
        }

        const table = <keyof typeof collections>insert[1]
        const collection = collections[table]

        if (!collection) {
            continue
        }

        const fields: string[] = []
        const fieldReg = /\[([^\]]+)\](, )?/g

        for (let field: RegExpExecArray; (field = fieldReg.exec(insert[2])); ) {
            fields.push(field[1])
        }

        const values: string[] = []
        const valueReg = new RegExp(`${valueTest}(, )?`, 'g')

        for (let value: RegExpExecArray; (value = valueReg.exec(insert[3])); ) {
            values.push(value[1])
        }

        if (fields.length !== values.length) {
            throw new Error(`bad INSERT: ${insert[0]} ${insert[1]} ${insert[2]}`)
        }

        const quoteReg = /''/g
        const row: any = {}

        for (let i = 0; i < fields.length; i++) {
            const value = values[i]

            row[fields[i]] =
                value === 'NULL'
                    ? null
                    : value.charAt(0) === 'N'
                    ? value.substr(2, value.length - 3).replace(quoteReg, "'")
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

    const mediaMigrationMap = recordingCollection.mediaMigration
    const mediaMap = mediaCollection.migrationMap

    for (let recording of Object.values(recordings)) {
        const media = mediaMap[mediaMigrationMap[recording._id]]

        if (!media) {
            throw new Error(`no media information for ${recording._id}`)
        }

        recording.containerType = media.type

        if (media.containerId) {
            recording.containerId = media.containerId
        }

        if (media.position) {
            recording.containerPosition = media.position
        }

        const test = validate(recording, recordingCollection.schema)

        if (test) {
            throw new Error(JSON.stringify(test))
        }
    }

    for (let collection of Object.values(collections)) {
        await collection.migrate()
    }

    await seriesCollection.refreshFullNames(null)
    await recordingCollection.refreshFullNames({})
}
