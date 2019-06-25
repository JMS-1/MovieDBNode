import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'

import { linkCollection, LinkSchema } from './links'
import { RelationCollection, RelationSchema } from './relation'

import { containerCollection } from '../database/container'
import { genreCollection } from '../database/genre'
import { languageCollection } from '../database/language'
import { mediaCollection } from '../database/media'
import { recordingCollection } from '../database/recording'
import { seriesCollection } from '../database/series'
import { addSchema } from '../database/validation'

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
}
