import { createSelector } from 'reselect'

import { IGenre, IQueryCountInfo } from 'movie-db-api'
import { IClientState, ISelectOption } from 'movie-db-client'

export interface IGenreMap {
    [id: string]: IGenre
}

export interface IGenreCountMap {
    [id: string]: IQueryCountInfo
}

export const getGenreMap = createSelector(
    (state: IClientState) => state.genre.all,
    (all): IGenreMap => {
        const map: IGenreMap = {}

        all.forEach(l => (map[l._id] = l))

        return map
    },
)

export const getGenreCountMap = createSelector(
    (state: IClientState) => state.recording.genreInfo,
    (all): IGenreCountMap => {
        const map: IGenreCountMap = {}

        all.forEach(g => (map[g._id] = g))

        return map
    },
)

export const getGenreOptions = createSelector(
    (state: IClientState) => state.genre.all,
    getGenreCountMap,
    (all, counts): ISelectOption[] => {
        const options: ISelectOption[] = all
            .map(g => {
                const info = counts[g._id]

                return info && info.count && { key: g._id, text: g.name || g._id, value: g._id }
            })
            .filter(o => o)

        options.sort((l, r) => l.text.localeCompare(r.text))

        return options
    },
)
