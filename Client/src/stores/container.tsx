import { computed } from 'mobx'
import * as React from 'react'
import { SemanticICONS, DropdownItemProps, Icon } from 'semantic-ui-react'

import { HierarchyStore } from './item'
import { routes } from './routes'

import { IContainer, TContainerType } from '../../../Server/src/model'

const optionOrder = ['Undefined', 'FeatureSet', 'Box', 'Shelf', 'Folder', 'Disk']

export class ContainerStore extends HierarchyStore<IContainer> {
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
            type: 'Undefined',
        }
    }

    protected toProtocol(container: IContainer, toSend = false): Partial<IContainer> {
        return {
            description: container.description,
            name: container.name,
            parentId: container.parentId || null,
            parentLocation: container.parentLocation,
            type: toSend ? container.type : (TContainerType[container.type] as TContainerType),
        }
    }

    @computed({ keepAlive: true })
    get typesAsOptions(): DropdownItemProps[] {
        const mui = this.root.translations.strings.container.types

        return optionOrder.map((c: keyof typeof mui) => ({
            key: c,
            text: (
                <span>
                    <Icon name={mui[c].icon} /> {mui[c].title}
                </span>
            ),
            value: c,
        }))
    }
}
