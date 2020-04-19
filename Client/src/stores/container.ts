import { routes } from 'movie-db-client'

import { ItemStore } from './item'

import { IContainer } from '../../../Server/src/model'

export class ContainerStore extends ItemStore<IContainer> {
    protected readonly itemProps = '_id name description parentId parentLocation type'

    protected readonly itemScope = 'containers'

    protected readonly itemRoute = routes.container

    protected readonly validationName = 'Container'

    getName(container: IContainer): string {
        return container?.name || container?._id
    }

    protected createNew(): IContainer {
        return {
            _id: undefined,
            description: undefined,
            name: '',
            parentId: undefined,
            parentLocation: undefined,
            type: undefined,
        }
    }

    protected toProtocol(container: IContainer): Partial<IContainer> {
        return {
            description: container.description,
            name: container.name,
            parentId: container.parentId || null,
            parentLocation: container.parentLocation,
            type: container.type,
        }
    }
}
