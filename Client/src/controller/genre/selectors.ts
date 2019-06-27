import { createSelector } from 'reselect'

import { IGenre } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

export interface IGenreMap {
    [id: string]: IGenre
}

export const getGenreMap = createSelector(
    (state: IClientState) => state.genre.all,
    (all): IGenreMap => {
        const map: IGenreMap = {}

        all.forEach(l => (map[l._id] = l))

        return map
    },
)
