import { createSelector } from 'reselect'

import { ISeries } from 'movie-db-api'
import { IClientState, ISelectOption, Separators } from 'movie-db-client'

export interface ISeriesInfo {
    name: string
    children: string[]
    raw: ISeries
}

export interface ISeriesMap {
    [id: string]: ISeriesInfo
}

export interface ISeriesChildMap {
    [id: string]: string[]
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
    (all, lookup): ISeriesChildMap => {
        const map: ISeriesChildMap = {}

        for (let container of all) {
            const parentId = container.parentId || ''

            let parentInfo = map[parentId]

            if (!parentInfo) {
                map[parentId] = parentInfo = []
            }

            parentInfo.push(container._id)
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

function buildOptions(scope: string, list: ISelectOption[], tree: ISeriesChildMap, lookup: ISeriesMap): void {
    const children = (tree[scope] || []).map(id => lookup[id]).filter(s => s)

    for (let child of children) {
        const series = child.raw

        list.push({ key: series._id, text: child.name, value: series._id })

        buildOptions(series._id, list, tree, lookup)
    }
}

export const getSeriesOptions = createSelector(
    getSeriesChildMap,
    getSeriesMap,
    (tree, map): ISelectOption[] => {
        const list: ISelectOption[] = []

        buildOptions('', list, tree, map)

        return list
    },
)
