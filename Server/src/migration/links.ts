import { v4 as uuid } from 'uuid'

import { IDbLink, LinkSchema } from '../database/recording'
import { CollectionBase } from '../database/utils'
import { validate } from '../database/validation'

export interface ILink extends IDbLink {
    _id: string
    for: string
    ordinal: number
}

export const linkCollection = new (class extends CollectionBase<ILink> {
    readonly name = 'n/a'

    readonly schema = LinkSchema

    fromSql(sql: any): void {
        const link: ILink = {
            _id: uuid(),
            for: sql.For,
            name: sql.Name || '',
            ordinal: parseInt(sql.Ordinal, 10),
            url: sql.Url,
        }

        if (sql.Description) {
            link.description = sql.Description
        }

        const errors = validate(link, this.schema)

        if (errors) {
            throw new Error(JSON.stringify(errors))
        }

        this.cacheMigrated(link)
    }

    migrate(): Promise<void> {
        return Promise.resolve<void>(undefined)
    }
})()
