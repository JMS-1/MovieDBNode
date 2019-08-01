import { addSchema, convertToMongo } from '@jms-1/isxs-validation'

import { containerCollection } from './container'
import { genreCollection } from './genre'
import { languageCollection } from './language'
import { recordingCollection } from './recording'
import { seriesCollection } from './series'
import { dbConnect } from './utils'

export async function initializeDatabase(): Promise<void> {
    const collections = [
        containerCollection,
        genreCollection,
        languageCollection,
        recordingCollection,
        seriesCollection,
    ]

    const db = await dbConnect()

    for (let { schema, name, initialize } of collections) {
        // Interne Prüfumgebung initialisieren.
        addSchema(schema)

        // Eventuell die Tabelle erstmalig anlegen.
        const collection = await db.createCollection(name)

        // Initialisierung durchführen.
        await initialize(collection)

        // Immer die Prüfregeln in der Datenbank auf den neuesten Stand bringen.
        await db.command({ collMod: name, validator: { $jsonSchema: convertToMongo(schema) } })
    }
}
