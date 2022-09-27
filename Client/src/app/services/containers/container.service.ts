import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import { Observable, Subject } from 'rxjs'

import * as api from '../../../api'
import { EditableService } from '../edit.service'
import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'

export interface IContainer extends api.IContainer {
    allChildren: Set<string>
    children: IContainer[]
    fullName: string
    level: number
}

export interface IContainerPosition {
    _id: string
    containerPosition: string
    fullName: string
}

const query = gql<{ recordings: { findByContainer: IContainerPosition[] } }, { id: string }>(`
    query ($id: ID!) {
        recordings {
            findByContainer(containerId: $id) {
                _id fullName containerPosition
            }
        }
    }
`)

@Injectable()
export class ContainerService extends EditableService<IContainer> {
    protected override readonly ignoredFields: string[] = [
        '__typename',
        '_id',
        'allChildren',
        'children',
        'fullName',
        'level',
    ]

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

    protected override toServer(item: Partial<IContainer>): Partial<IContainer> {
        item.type = api.containerType[item.type as api.containerType] as unknown as api.containerType

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

            container.fullName = container.name

            const parent = container.parentId && map[container.parentId]

            if (!parent) {
                return 0
            }

            if (parent.allChildren) {
                parent.allChildren.add(container._id)
            } else {
                parent.allChildren = new Set([container._id])
            }

            const level = prepareAndGetLevel(parent)

            container.fullName = `${parent.fullName} > ${container.name}`

            return level + 1
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

    getContents(id: string): Observable<IContainerPosition[]> {
        const obs = new Subject<IContainerPosition[]>()

        this._errors.serverCall(this._gql.query({ query, variables: { id } }), (data) =>
            obs.next(data.recordings.findByContainer)
        )

        return obs
    }
}
