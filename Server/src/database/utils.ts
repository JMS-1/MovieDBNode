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

export abstract class CollectionBase<TType> {
    abstract readonly name: string

    abstract readonly schema: IValidatableSchema

    async getCollection(): Promise<Collection<TType>> {
        const db = await dbConnect()

        return db.collection(this.name)
    }

    async insert(container: TType): Promise<IValidationError[]> {
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
                        {
                            contraint: 'database',
                            message: getError(error),
                            property: '*',
                        },
                    ]
                )
            } catch (e) {
                throw error
            }
        }
    }

    async query(filter?: FilterQuery<TType>, sort?: object, project?: object): Promise<TType[]> {
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
