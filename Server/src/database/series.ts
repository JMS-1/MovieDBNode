import { Collection } from 'mongodb'

import { collectionName, IDbSeries, SeriesSchema } from './entities/series'
import { recordingCollection } from './recording'
import { CollectionBase } from './utils'
import { validate } from './validation'

export * from './entities/series'

export const seriesCollection = new (class extends CollectionBase<IDbSeries> {
    readonly name = collectionName

    readonly schema = SeriesSchema

    async initialize(collection: Collection<IDbSeries>): Promise<void> {
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
})()
