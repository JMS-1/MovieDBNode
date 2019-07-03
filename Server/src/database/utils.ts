import * as debug from 'debug'
import { Collection, Db, FilterQuery, MongoClient, MongoClientOptions } from 'mongodb'

import { IValidatableSchema, IValidationError } from 'movie-db-api'

import { validate } from './validation'

import { getError } from '../utils'

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

            if (process.env.DBUSER) {
                options.auth = {
                    user: process.env.DBUSER,
                    password: process.env.DBPASSWORD,
                }
            }

            loader = MongoClient.connect(process.env.DATABASE, options)
        }

        try {
            const client = await loader

            return client.db()
        } catch (e) {
            databaseError('unable to connect to database: %s', getError(e))

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

    initialize(collection: Collection<TType>): Promise<void> {
        return Promise.resolve<void>(undefined)
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

    async insertOne(item: TType): Promise<IValidationError[]> {
        try {
            const me = await this.getCollection()

            await me.insertOne(item)

            return undefined
        } catch (error) {
            if (error.code !== 121) {
                databaseError('error during insert: %s', getError(error))

                throw error
            }

            try {
                return (
                    validate(item, this.schema) || [{ constraint: 'database', message: getError(error), property: '*' }]
                )
            } catch (e) {
                databaseError('error during insert validation: %s', getError(e))

                throw error
            }
        }
    }

    async findOneAndReplace(item: TType): Promise<IValidationError[]> {
        try {
            const me = await this.getCollection()
            const updated = await me.findOneAndReplace({ _id: item._id }, item)

            if (!updated) {
                return [{ constraint: 'database', message: 'Nicht gefunden', property: '_id' }]
            }

            return undefined
        } catch (error) {
            if (error.code !== 121) {
                databaseError('error during update: %s', getError(error))

                throw error
            }

            try {
                return (
                    validate(item, this.schema) || [{ constraint: 'database', message: getError(error), property: '*' }]
                )
            } catch (e) {
                databaseError('error during update validation: %s', getError(e))

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

    async findOne(id: string): Promise<TType> {
        const me = await this.getCollection()

        return me.findOne({ _id: id.toString() })
    }

    protected canDelete(id: string): Promise<string> {
        return Promise.resolve<string>(undefined)
    }

    protected postDelete(id: string): Promise<void> {
        return Promise.resolve<void>(undefined)
    }

    async deleteOne(id: string): Promise<IValidationError[]> {
        try {
            const forbidDelete = await this.canDelete(id)

            if (forbidDelete) {
                return [{ constraint: 'delete', property: '*', message: forbidDelete }]
            }

            const me = await this.getCollection()
            const deleted = await me.deleteOne({ _id: typeof id === 'string' && id })

            if (deleted.deletedCount !== 1) {
                return [{ constraint: 'delete', property: '*', message: 'nicht gefunden' }]
            }

            await this.postDelete(id)

            return undefined
        } catch (error) {
            return [{ constraint: 'database', property: '*', message: getError(error) }]
        }
    }
}
