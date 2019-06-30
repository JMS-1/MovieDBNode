import * as React from 'react'
import { createSelector } from 'reselect'
import { DropdownItemProps, Icon } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'
import { IClientState, Separators } from 'movie-db-client'

export interface IContainerInfo {
    name: string
    raw: IContainer
}

export interface IContainerMap {
    [id: string]: IContainerInfo
}

export interface IContainerChildMap {
    [id: string]: string[]
}

function getFullContainerName(id: string, map: IContainerMap): string {
    const info = map[id]

    if (!info) {
        return ''
    }

    if (info.name) {
        return info.name
    }

    const container = info.raw
    const parent = getFullContainerName(container.parentId, map)

    if (parent) {
        info.name = `${parent}${Separators.Container}${container.name}`
    } else {
        info.name = container.name
    }

    return info.name
}

export const getContainerMap = createSelector(
    (state: IClientState) => state.container.all,
    (all): IContainerMap => {
        const map: IContainerMap = {}

        all.forEach(c => (map[c._id] = { raw: c, name: undefined }))

        for (let container of Object.values(map)) {
            getFullContainerName(container.raw._id, map)
        }

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
    const name = self && self.raw.name && self.raw.name.toLocaleLowerCase()

    if (!name || name.indexOf(filter) < 0) {
        delete map[scope]
    }
}

export const getFilteredContainerChildMap = createSelector(
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

                return ((left && left.raw.name) || left.raw._id).localeCompare(
                    (right && right.raw.name) || right.raw._id,
                )
            })
        }

        return map
    },
)

export const getContainerEdit = createSelector(
    (state: IClientState) => state.container.workingCopy,
    (state: IClientState) => state.container.selected,
    getContainerMap,
    (edit, selected, map): IContainer => edit || (map[selected] && map[selected].raw),
)

const optionOrder: containerType[] = [
    containerType.Folder,
    containerType.FeatureSet,
    containerType.Box,
    containerType.Disk,
    containerType.Shelf,
    containerType.Undefined,
]

export const getContainerTypeOptions = createSelector(
    (state: IClientState) => state.mui.container.types,
    (mui): DropdownItemProps[] =>
        optionOrder.map(c => ({
            key: c,
            text: (
                <span>
                    <Icon name={mui[c].icon} /> {mui[c].title}
                </span>
            ),
            value: c,
        })),
)

export const getAllConatinerOptions = createSelector(
    getContainerMap,
    (state: IClientState) => state.mui.container.types,
    (all, types): DropdownItemProps[] =>
        Object.values(all)
            .map(c => ({
                key: c.raw._id,
                sort: c.name || c.raw._id,
                text: (
                    <span>
                        <Icon name={(types[c.raw.type] && types[c.raw.type].icon) || 'help'} /> {c.name || c.raw._id}
                    </span>
                ),
                value: c.raw._id,
            }))
            .sort((l, r) => l.sort.localeCompare(r.sort)),
)
