import { ItemStore } from './item'

import { IContainer } from '../../../Server/src/model'

export class ContainerStore extends ItemStore<IContainer> {
    protected readonly itemProps = '_id name description parentId parentLocation type'

    protected readonly itemScope = 'containers'

    protected readonly validationName = 'Container'
}
