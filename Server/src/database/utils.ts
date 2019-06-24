import { Db, MongoClient } from 'mongodb'

let loader: Promise<MongoClient>

function sleep(ms: number): Promise<void> {
    return new Promise<void>(success => setTimeout(success, ms))
}

export async function dbConnect(): Promise<Db> {
    for (; ; await sleep(5000)) {
        if (!loader) {
            loader = MongoClient.connect(process.env.DATABASE, {
                autoReconnect: true,
                promiseLibrary: Promise,
                reconnectTries: Number.MAX_VALUE,
                useNewUrlParser: true,
            })
        }

        try {
            const client = await loader

            return client.db()
        } catch (e) {
            loader = null
        }
    }
}
