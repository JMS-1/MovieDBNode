import { computed, makeObservable } from 'mobx'

import { RootStore } from '.'
import { HierarchyItemStore } from './hierarchicalItem'
import { routes } from './routes'
import { createFiltered } from './utils'

import { ISeries } from '../../../Server/src/model'

export class SeriesStore extends HierarchyItemStore<ISeries> {
    readonly itemProps = '_id name description parentId fullName'

    readonly itemScope = 'series'

    readonly itemRoute = routes.series

    protected readonly validationName = 'Series'

    constructor(root: RootStore) {
        super(root)

        makeObservable(this, { orderedAndFiltered: computed({ keepAlive: true }) })
    }

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

    get orderedAndFiltered(): string[] {
        return createFiltered(this._items, this.filter, this.getName.bind(this))
    }
}
