import { IValidationError } from 'movie-db-api'

import { collectionName, IDbSeries, SeriesSchema } from './entities/series'
import { CollectionBase } from './utils'
import { validate } from './validation'

export * from './entities/series'

export const seriesCollection = new (class extends CollectionBase<IDbSeries> {
    readonly name = collectionName

    readonly schema = SeriesSchema

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

    async deleteOne(id: string): Promise<IValidationError[]> {
        return [{ constraint: 'database', property: '*', message: 'not yet implemented' }]
    }
})()
