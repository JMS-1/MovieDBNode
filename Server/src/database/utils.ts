import { getMessage } from '@jms-1/isxs-tools'
import { CollectionBase, IValidatableSchema } from '@jms-1/isxs-validation'
import * as debug from 'debug'
import { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb'

import { Config } from '../config'

export const databaseError = debug('database')

let loader: Promise<MongoClient>

function sleep(ms: number): Promise<void> {
    return new Promise<void>(success => setTimeout(success, ms))
}

export async function dbConnect(): Promise<Db> {
    for (; ; await sleep(5000)) {
        if (!loader) {
            const options: MongoClientOptions = {
                autoReconnect: true,
                promiseLibrary: Promise,
                reconnectTries: Number.MAX_VALUE,
                useNewUrlParser: true,
            }

            if (Config.user) {
                options.auth = {
                    user: Config.user,
                    password: Config.password,
                }
            }

            loader = MongoClient.connect(Config.db, options)
        }

        try {
            const client = await loader

            return client.db()
        } catch (e) {
            databaseError('unable to connect to database: %s', getMessage(e))

            loader = null
        }
    }
}

abstract class MigratableCollection<TType extends { _id: string }> extends CollectionBase<TType> {
    abstract readonly name: string

    abstract readonly schema: IValidatableSchema

    readonly migrationMap: { [id: string]: TType } = {}

    abstract fromSql(sql: any): void

    protected cacheMigrated(item: TType): void {
        if (this.migrationMap[item._id]) {
            throw new Error(`duplicated identifier '${item._id}`)
        }

        this.migrationMap[item._id] = item
    }

    async migrate(): Promise<void> {
        for (let item of Object.values(this.migrationMap)) {
            await this.insertOne(item)
        }
    }
}

export abstract class MovieDbCollection<TType extends { _id: string }> extends MigratableCollection<TType> {
    abstract readonly name: string

    abstract readonly schema: IValidatableSchema

    async getCollection(): Promise<Collection<TType>> {
        const db = await dbConnect()

        return db.collection(this.name)
    }
}
