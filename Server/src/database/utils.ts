import { Collection, Db, FilterQuery, MongoClient } from 'mongodb'

import { IValidatableSchema, IValidationError } from 'movie-db-api'

import { validate } from './validation'

import { getError } from '../utils'

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

export abstract class CollectionBase<TType extends { _id: string }> {
    abstract readonly name: string

    abstract readonly schema: IValidatableSchema

    readonly migrationMap: { [id: string]: TType } = {}

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

    async getCollection(): Promise<Collection<TType>> {
        const db = await dbConnect()

        return db.collection(this.name)
    }

    async insertOne(container: TType): Promise<IValidationError[]> {
        try {
            const me = await this.getCollection()

            await me.insertOne(container)

            return undefined
        } catch (error) {
            if (error.code !== 121) {
                throw error
            }

            try {
                return (
                    validate(container, this.schema) || [
                        { constraint: 'database', message: getError(error), property: '*' },
                    ]
                )
            } catch (e) {
                throw error
            }
        }
    }

    async findOneAndReplace(container: TType): Promise<IValidationError[]> {
        try {
            const me = await this.getCollection()
            const updated = await me.findOneAndReplace({ _id: container._id }, container)

            if (!updated) {
                return [{ constraint: 'database', message: 'Nicht gefunden', property: '_id' }]
            }

            return undefined
        } catch (error) {
            if (error.code !== 121) {
                throw error
            }

            try {
                return (
                    validate(container, this.schema) || [
                        { constraint: 'database', message: getError(error), property: '*' },
                    ]
                )
            } catch (e) {
                throw error
            }
        }
    }

    async find(filter?: FilterQuery<TType>, sort?: object, project?: object): Promise<TType[]> {
        const me = await this.getCollection()

        let query = me.find(filter)

        if (sort) {
            query = query.sort(sort)
        }

        if (project) {
            query = query.project(project)
        }

        return query.toArray()
    }
}
