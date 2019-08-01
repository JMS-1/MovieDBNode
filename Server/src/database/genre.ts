import { validate } from '@jms-1/isxs-validation'

import { collectionName, GenreSchema, IDbGenre } from './entities/genre'
import { recordingCollection } from './recording'
import { CollectionBase } from './utils'

export * from './entities/genre'

export const genreCollection = new (class extends CollectionBase<IDbGenre> {
    readonly name = collectionName

    readonly schema = GenreSchema

    fromSql(sql: any): void {
        const genre: IDbGenre = {
            _id: sql.Id,
            name: sql.Long || '',
        }

        const errors = validate(genre, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(genre)
    }

    protected async canDelete(id: string): Promise<string> {
        return recordingCollection.inUse('genres', id, 'Kategorie')
    }
})()
