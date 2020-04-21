import { computed } from 'mobx'

import { ItemStore } from './item'
import { routes } from './routes'
import { createFiltered } from './utils'

import { ISeries } from '../../../Server/src/model'

export class SeriesStore extends ItemStore<ISeries> {
    readonly itemProps = '_id name description parentId fullName'

    readonly itemScope = 'series'

    readonly itemRoute = routes.series

    protected readonly validationName = 'Series'

    getName(series: ISeries): string {
        return series?.name || series?._id
    }

    protected createNew(): ISeries {
        return {
            _id: undefined,
            description: undefined,
            fullName: undefined,
            name: '',
            parentId: undefined,
        }
    }

    protected toProtocol(series: ISeries): Partial<ISeries> {
        return {
            description: series.description,
            name: series.name,
            parentId: series.parentId || null,
        }
    }

    @computed({ keepAlive: true })
    get orderedAndFiltered(): string[] {
        return createFiltered(this._items, this.filter, this.getName.bind(this))
    }
}
