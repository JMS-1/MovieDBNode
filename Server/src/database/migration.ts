import * as fs from 'fs'
import { join } from 'path'
import { promisify } from 'util'

import { containerCollection } from './container'

const readFile = promisify(fs.readFile)

const temp = '\ufeff'

const doubleQuote = /''/g
const fieldReg = /\[([^\]]+)\]/g
const insertReg = /^INSERT \[dbo\]\.\[([^\]]+)\] \(([^\)]+)\) VALUES \((.+)\)$/
const normReg = /(N'([^']|'')*')/g
const tempOff = new RegExp(temp, 'g')
const tempOn = /,/g

export async function runMigration(): Promise<void> {
    const collections = {
        Containers: containerCollection,
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
