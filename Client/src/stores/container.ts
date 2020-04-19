import { computed } from 'mobx'
import { SemanticICONS } from 'semantic-ui-react'

import { ItemStore } from './item'
import { routes } from './routes'
import { createFiltered } from './utils'

import { IContainer } from '../../../Server/src/model'

export class ContainerStore extends ItemStore<IContainer> {
    protected readonly itemProps = '_id name description parentId parentLocation type'

    protected readonly itemScope = 'containers'

    readonly itemRoute = routes.container

    protected readonly validationName = 'Container'

    getName(container: IContainer): string {
        return container?.name || container?._id
    }

    getIcon(container: IContainer): SemanticICONS {
        const type = container?.type

        if (type === undefined) {
            return 'help'
        }

        const { types } = this.root.translations.strings.container

        return types[type as keyof typeof types]?.icon || 'help'
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

    @computed({ keepAlive: true })
    get orderedAndFiltered(): string[] {
        return createFiltered(this._items, this.filter, this.getName.bind(this))
    }
}
