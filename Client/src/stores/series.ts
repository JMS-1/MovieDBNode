import { HierarchyItemStore } from './hierarchicalItem'
import { routes } from './routes'

import { ISeries } from '../../../Server/src/model/client'

export class SeriesStore extends HierarchyItemStore<ISeries> {
    readonly itemProps = '_id name description parentId fullName'

    readonly itemScope = 'series'

    readonly itemRoute = routes.series

    protected readonly validationName = 'Series'

    getName(series: ISeries): string {
        return series?.name || series?._id
    }

    protected createNew(): ISeries {
        return {
            _id: undefined as unknown as string,
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
            parentId: (series.parentId || null) as unknown as string,
        }
    }
}
