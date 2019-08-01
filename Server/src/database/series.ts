import { IValidationError, validate } from '@jms-1/isxs-validation'
import { Collection } from 'mongodb'

import { collectionName, IDbSeries, SeriesSchema } from './entities/series'
import { recordingCollection } from './recording'
import { CollectionBase, databaseError } from './utils'

import { getError } from '../utils'

export * from './entities/series'

export const seriesCollection = new (class extends CollectionBase<IDbSeries> {
    readonly name = collectionName

    readonly schema = SeriesSchema

    async initialize(collection: Collection<IDbSeries>): Promise<void> {
        await collection.createIndex({ fullName: 1 }, { name: 'series_full' })
        await collection.createIndex({ name: 1 }, { name: 'series_name' })
        await collection.createIndex({ parentId: 1 }, { name: 'series_tree' })
    }

    fromSql(sql: any): void {
        const series: IDbSeries = {
            _id: sql.Id,
            name: sql.Name || '',
        }

        if (sql.Description) {
            series.description = sql.Description
        }

        if (sql.Parent) {
            series.parentId = sql.Parent
        }

        const errors = validate(series, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(series)
    }

    protected async canDelete(id: string): Promise<string> {
        return recordingCollection.inUse('series', id, 'Serie')
    }

    protected async postDelete(id: string): Promise<void> {
        const me = await this.getCollection()

        await me.updateMany({ parentId: typeof id === 'string' && id }, { $unset: { parentId: null } })
    }

    private async updateFullName(
        series: IDbSeries,
        parent: string,
        me: Collection<IDbSeries>,
        updates: string[],
    ): Promise<void> {
        updates.push(series._id)

        const fullName = parent ? `${parent} > ${series.name}` : series.name

        await me.findOneAndUpdate({ _id: series._id }, { $set: { fullName } })

        const children = await me.find({ parentId: series._id }).toArray()

        for (let child of children) {
            await this.updateFullName(child, fullName, me, updates)
        }
    }

    async refreshFullNames(series: IDbSeries): Promise<string[]> {
        const me = await this.getCollection()
        const updated: string[] = []

        if (series) {
            const parent = await me.findOne({ _id: series.parentId })

            await this.updateFullName(series, parent && parent.fullName, me, updated)
        } else {
            const children = await me.find({ parentId: null }).toArray()

            for (let child of children) {
                await this.updateFullName(child, '', me, updated)
            }
        }

        return updated
    }

    async insertOne(series: IDbSeries): Promise<IValidationError[]> {
        const errors = await super.insertOne(series)

        if (!errors || errors.length < 1) {
            try {
                await this.refreshFullNames(series)
            } catch (error) {
                databaseError('failed to refresh series full name: %s', getError(error))
            }
        }

        return errors
    }

    async findOneAndReplace(series: IDbSeries): Promise<IValidationError[]> {
        const errors = await super.findOneAndReplace(series)

        if (!errors || errors.length < 1) {
            try {
                await recordingCollection.refreshFullNames({ series: { $in: await this.refreshFullNames(series) } })
            } catch (error) {
                databaseError('failed to refresh series full name: %s', getError(error))
            }
        }

        return errors
    }
})()
