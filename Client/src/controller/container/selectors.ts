import { createSelector } from 'reselect'

import { IContainer } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

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

        all.forEach(c => (map[c.id] = c))

        return map
    },
)

export const getContainerChildMap = createSelector(
    (state: IClientState) => state.container.all,
    getContainerMap,
    (all, lookup): IContainerChildMap => {
        const map: IContainerChildMap = {}

        for (let container of all) {
            const parentId = container.parentId || ''

            let parentInfo = map[parentId]

            if (!parentInfo) {
                map[parentId] = parentInfo = []
            }

            parentInfo.push(container.id)
        }

        for (let children of Object.values(map)) {
            children.sort((l, r) => {
                const left = lookup[l]
                const right = lookup[r]

                return ((left && left.name) || left.id).localeCompare((right && right.name) || right.id)
            })
        }

        return map
    },
)
