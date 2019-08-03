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

    for (let collection of collections) {
        // Eventuell die Tabelle erstmalig anlegen.
        const dbCollection = await db.createCollection(collection.name)

        // Initialisierung durchführen.
        await collection.initialize(dbCollection, db)
    }
}
