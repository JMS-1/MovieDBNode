import { addSchema, validate } from '@jms-1/isxs-validation'
import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'

import { linkCollection, MigrateLinkSchema } from './links'
import { mediaCollection, MigrateMediaSchema } from './media'
import { RelationCollection, RelationSchema } from './relation'

import { recordingCollection } from '../database/recording'

const readFile = promisify(fs.readFile)

const genreLinks = new (class extends RelationCollection {})('Genre')

const languageLinks = new (class extends RelationCollection {})('Language')

export async function runMigration(): Promise<void> {
    addSchema(MigrateLinkSchema)
    addSchema(MigrateMediaSchema)
    addSchema(RelationSchema)

    const collections = {
        Links: linkCollection,
        Media: mediaCollection,
        RecordingGenres: genreLinks,
        RecordingLanguages: languageLinks,
        Recordings: recordingCollection,
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
            const expected = str.split('\r\n').filter((s) => s.startsWith('INSERT ')).length

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

    for (const link of Object.values(linkCollection.migrationMap)) {
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

    for (const recording of Object.values(recordings)) {
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

    for (const collection of Object.values(collections)) {
        await collection.migrate()
    }

    await recordingCollection.refreshFullNames({})
}
