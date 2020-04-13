import { ItemStore } from './item'

import { ISeries } from '../../../Server/src/model'

export class SeriesStore extends ItemStore<ISeries> {
    protected readonly itemProps = '_id name description parentId fullName'

    protected readonly itemScope = 'series'

    protected readonly validationName = 'Series'
}
