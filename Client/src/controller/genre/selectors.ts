import { createSelector } from 'reselect'
import { DropdownItemProps } from 'semantic-ui-react'

import { IGenre, IQueryCountInfo } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

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
    (all, counts): DropdownItemProps[] => {
        const options: DropdownItemProps[] = all
            .map(g => {
                const info = counts[g._id]

                return info && info.count && { key: g._id, sort: g.name || g._id, text: g.name || g._id, value: g._id }
            })
            .filter(o => o)

        options.sort((l, r) => l.sort.localeCompare(r.sort))

        return options
    },
)

export const getAllGenreOptions = createSelector(
    (state: IClientState) => state.genre.all,
    (all): DropdownItemProps[] =>
        all
            .map(g => <DropdownItemProps>{ key: g._id, sort: g.name || g._id, text: g.name || g._id, value: g._id })
            .sort((l, r) => l.sort.localeCompare(r.sort)),
)

export const getGenreEdit = createSelector(
    (state: IClientState) => state.genre.workingCopy,
    (state: IClientState) => state.genre.selected,
    getGenreMap,
    (edit, selected, map): IGenre => edit || map[selected],
)
