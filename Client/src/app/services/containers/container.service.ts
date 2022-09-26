import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'

import * as api from '../../../api'
import { EditableService } from '../edit.service'
import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'

export interface IContainer extends api.IContainer {
    allChildren: Set<string>
    children: IContainer[]
    level: number
}

@Injectable()
export class ContainerService extends EditableService<IContainer> {
    protected override readonly ignoredFields: string[] = ['_id', '__typename', 'level', 'children', 'allChildren']

    constructor(gql: Apollo, validation: ValidationService, router: Router, errors: ErrorService) {
        super(
            gql,
            'Container',
            'containers',
            '_id name description parentId parentLocation type',
            validation,
            router,
            errors
        )

        this.load()
    }

    protected override fromServer(item: Partial<IContainer>): Partial<IContainer> {
        item.type = api.containerType[item.type || api.containerType.Undefined] as unknown as api.containerType

        return item
    }

    protected override createNew(): Partial<IContainer> {
        return {
            type: api.containerType.Undefined,
        }
    }

    protected override createMap(containers: IContainer[]): Record<string, IContainer> {
        const map = super.createMap(containers)

        const prepareAndGetLevel = (container: IContainer): number => {
            if (typeof container.level === 'number') {
                return container.level
            }

            const parent = container.parentId && map[container.parentId]

            if (!parent) {
                return 0
            }

            if (parent.allChildren) {
                parent.allChildren.add(container._id)
            } else {
                parent.allChildren = new Set([container._id])
            }

            return prepareAndGetLevel(parent) + 1
        }

        containers.forEach((c) => (c.level = prepareAndGetLevel(c)))

        containers.forEach(
            (c) =>
                (c.children = Array.from(c.allChildren || [])
                    .map((id) => map[id])
                    .sort((l, r) =>
                        (l.name || l._id).toLocaleLowerCase().localeCompare((r.name || r._id).toLocaleLowerCase())
                    ))
        )

        return map
    }
}
