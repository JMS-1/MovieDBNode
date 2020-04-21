import { recordingCollection } from './recording'
import { dbConnect } from './utils'

export async function initializeDatabase(): Promise<void> {
    const collections = [recordingCollection]

    const db = await dbConnect()

    for (const collection of collections) {
        // Eventuell die Tabelle erstmalig anlegen.
        const dbCollection = await db.createCollection(collection.name)

        // Initialisierung durchführen.
        await collection.initialize(dbCollection)
    }
}
