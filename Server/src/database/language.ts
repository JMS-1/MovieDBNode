import { IMuiString, validate } from '@jms-1/isxs-validation'

import { collectionName, IDbLanguage, LanguageSchema } from './entities/language'
import { recordingCollection } from './recording'
import { MovieDbCollection } from './utils'

export * from './entities/language'

export const languageCollection = new (class extends MovieDbCollection<IDbLanguage> {
    readonly name = collectionName

    readonly schema = LanguageSchema

    fromSql(sql: any): void {
        const language: IDbLanguage = {
            _id: sql.Id,
            name: sql.Long || '',
        }

        const errors = validate(language, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(language)
    }

    protected async canDelete(id: string): Promise<IMuiString> {
        return recordingCollection.inUse('languages', id, 'Sprache')
    }
})()
