import { createSelector } from 'reselect'

import { IContainer } from 'movie-db-api'
import { IClientState, Separators } from 'movie-db-client'

export interface IContainerMap {
    [id: string]: IContainer
}

export interface IContainerChildMap {
    [id: string]: string[]
}

export const getContainerMap = createSelector(
    (state: IClientState) => state.container.all,
    (all): IContainerMap => {
        const map: IContainerMap = {}

        all.forEach(c => (map[c._id] = c))

        return map
    },
)

function filterChildMap(map: IContainerChildMap, scope: string, filter: string, lookup: IContainerMap): void {
    // Das wird Bottom-Up gemacht
    const children = map[scope] || []

    for (let child of children) {
        filterChildMap(map, child, filter, lookup)
    }

    // Eventuell wurden Einträge entfernt.
    map[scope] = children.filter(c => map[c])

    // Aber wir haben noch Kinder, dann ist nichts zu tun.
    if (map[scope].length > 0) {
        return
    }

    // Wenn auch unser Name nicht zum Filter passt verschwinden wird.
    const self = lookup[scope]
    const name = self && self.name && self.name.toLocaleLowerCase()

    if (!name || name.indexOf(filter) < 0) {
        delete map[scope]
    }
}

export const getContainerChildMap = createSelector(
    (state: IClientState) => state.container.all,
    (state: IClientState) => state.container.filter,
    getContainerMap,
    (all, filter, lookup): IContainerChildMap => {
        const map: IContainerChildMap = {}

        for (let container of all) {
            const parentId = container.parentId || ''

            let parentInfo = map[parentId]

            if (!parentInfo) {
                map[parentId] = parentInfo = []
            }

            parentInfo.push(container._id)
        }

        if (filter) {
            filterChildMap(map, '', filter.toLocaleLowerCase(), lookup)
        }

        for (let children of Object.values(map)) {
            children.sort((l, r) => {
                const left = lookup[l]
                const right = lookup[r]

                return ((left && left.name) || left._id).localeCompare((right && right.name) || right._id)
            })
        }

        return map
    },
)

export const getContainerEdit = createSelector(
    (state: IClientState) => state.container.workingCopy,
    (state: IClientState) => state.container.selected,
    getContainerMap,
    (edit, selected, map): IContainer => edit || map[selected],
)

export function getFullContainerName(id: string, map: IContainerMap): string {
    const container = map[id]

    if (!container) {
        return ''
    }

    const parent = getFullContainerName(container.parentId, map)

    if (parent) {
        return `${parent}${Separators.Container}${container.name}`
    }

    return container.name
}
