import { createSelector } from 'reselect'

import { IContainer } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

export interface IContainerMap {
    [id: string]: IContainer
}

export const getContainerMap = createSelector(
    (state: IClientState) => state.container.all,
    (all): IContainerMap => {
        const map: IContainerMap = {}

        all.forEach(c => (map[c.id] = c))

        return map
    },
)
