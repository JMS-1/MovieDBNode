import * as React from 'react'
import { createSelector } from 'reselect'
import { DropdownItemProps, Icon } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'
import { IClientState, IMuiState, ITreeStructure, Separators } from 'movie-db-client'

import { createChildMap, filterChildMap, sortChildMap } from '../utils'

export interface IContainerInfo {
    name: string
    raw: IContainer
}

export interface IContainerMap {
    [id: string]: IContainerInfo
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

export const getFilteredContainerChildMap = createSelector(
    (state: IClientState) => state.container.all,
    (state: IClientState) => state.container.filter,
    getContainerMap,
    (all, filter, lookup): ITreeStructure => {
        const map = createChildMap(all)

        if (filter) {
            filterChildMap(map, '', filter.toLocaleLowerCase(), lookup)
        }

        return sortChildMap(map, lookup)
    },
)

export const getContainerEdit = createSelector(
    (state: IClientState) => state.container.workingCopy,
    (state: IClientState) => state.container.selected,
    getContainerMap,
    (edit, selected, map): IContainer => edit || (map[selected] && map[selected].raw),
)

const optionOrder: containerType[] = [
    containerType.Undefined,
    containerType.FeatureSet,
    containerType.Box,
    containerType.Shelf,
    containerType.Folder,
    containerType.Disk,
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

function buildOptions(
    scope: string,
    list: DropdownItemProps[],
    tree: ITreeStructure,
    lookup: IContainerMap,
    types: IMuiState['container']['types'],
    exclude?: string,
): DropdownItemProps[] {
    const children = (tree[scope] || []).map(id => id !== exclude && lookup[id]).filter(s => s)

    for (let child of children) {
        const container = child.raw

        list.push({
            key: container._id,
            icon: { name: (types[container.type] && types[container.type].icon) || 'help' },
            text: child.name || container._id,
            value: container._id,
        })

        buildOptions(container._id, list, tree, lookup, types, exclude)
    }

    return list
}

export const getContainerChildMap = createSelector(
    (state: IClientState) => state.container.all,
    getContainerMap,
    (all, lookup): ITreeStructure => sortChildMap(createChildMap(all), lookup),
)

export const getContainerOptions = createSelector(
    getContainerChildMap,
    getContainerMap,
    (state: IClientState) => state.mui.container.types,
    (tree, map, types): DropdownItemProps[] => buildOptions('', [], tree, map, types),
)

export const getContainerOptionsNoEdit = createSelector(
    getContainerChildMap,
    getContainerMap,
    (state: IClientState) => state.mui.container.types,
    getContainerEdit,
    (tree, map, types, edit): DropdownItemProps[] => buildOptions('', [], tree, map, types, edit && edit._id),
)
