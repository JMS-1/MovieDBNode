import { createSelector } from 'reselect'
import { DropdownItemProps } from 'semantic-ui-react'

import { ISeries } from 'movie-db-api'
import { IClientState, ITreeStructure, Separators } from 'movie-db-client'

import { createChildMap, filterChildMap, sortChildMap } from '../utils'

export interface ISeriesInfo {
    name: string
    children: string[]
    raw: ISeries
}

export interface ISeriesMap {
    [id: string]: ISeriesInfo
}

function processSeries(id: string, map: ISeriesMap): ISeriesInfo {
    const info = map[id]

    if (info && !info.name) {
        const series = info.raw
        const parent = processSeries(series.parentId, map)

        if (parent) {
            for (let p = parent; p; p = map[p.raw.parentId]) {
                p.children.push(...info.children)
                p.children.push(id)
            }

            info.name = `${parent.name}${Separators.Series}${series.name}`
        } else {
            info.name = series.name
        }
    }

    return info
}

export const getSeriesMap = createSelector(
    (state: IClientState) => state.series.all,
    (all): ISeriesMap => {
        const map: ISeriesMap = {}

        all.forEach(c => (map[c._id] = { raw: c, name: undefined, children: [c._id] }))

        for (let container of Object.values(map)) {
            processSeries(container.raw._id, map)
        }

        return map
    },
)

export const getSeriesChildMap = createSelector(
    (state: IClientState) => state.series.all,
    getSeriesMap,
    (all, lookup): ITreeStructure => sortChildMap(createChildMap(all), lookup),
)

function buildOptions(
    scope: string,
    list: DropdownItemProps[],
    tree: ITreeStructure,
    lookup: ISeriesMap,
    exclude?: string,
): DropdownItemProps[] {
    const children = (tree[scope] || []).map(id => id !== exclude && lookup[id]).filter(s => s)

    for (let child of children) {
        const series = child.raw

        list.push({ key: series._id, text: child.name, value: series._id })

        buildOptions(series._id, list, tree, lookup, exclude)
    }

    return list
}

export const getSeriesOptions = createSelector(
    getSeriesChildMap,
    getSeriesMap,
    (tree, map): DropdownItemProps[] => buildOptions('', [], tree, map),
)

export const getFilteredSeriesChildMap = createSelector(
    (state: IClientState) => state.series.all,
    (state: IClientState) => state.series.filter,
    getSeriesMap,
    (all, filter, lookup): ITreeStructure => {
        const map = createChildMap(all)

        if (filter) {
            filterChildMap(map, '', filter.toLocaleLowerCase(), lookup)
        }

        return sortChildMap(map, lookup)
    },
)

export const getSeriesEdit = createSelector(
    (state: IClientState) => state.series.workingCopy,
    (state: IClientState) => state.series.selected,
    getSeriesMap,
    (edit, selected, map): ISeries => edit || (map[selected] && map[selected].raw),
)

export const getSeriesOptionsNoEdit = createSelector(
    getSeriesChildMap,
    getSeriesMap,
    getSeriesEdit,
    (tree, map, edit): DropdownItemProps[] => buildOptions('', [], tree, map, edit && edit._id),
)
