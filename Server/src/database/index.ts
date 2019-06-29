import { containerCollection } from './container'
import { genreCollection } from './genre'
import { languageCollection } from './language'
import { recordingCollection } from './recording'
import { convertToMongo } from './schema'
import { seriesCollection } from './series'
import { dbConnect } from './utils'
import { addSchema } from './validation'

export async function initializeDatabase(): Promise<void> {
    const collections = [
        containerCollection,
        genreCollection,
        languageCollection,
        recordingCollection,
        seriesCollection,
    ]

    const db = await dbConnect()

    for (let { schema, name } of collections) {
        // Interne Prüfumgebung initialisieren.
        addSchema(schema)

        // Eventuell die Tabelle erstmalig anlegen.
        await db.createCollection(name)

        // Immer die Prüfregeln in der Datenbank auf den neuesten Stand bringen.
        await db.command({ collMod: name, validator: { $jsonSchema: convertToMongo(schema) } })
    }
}
