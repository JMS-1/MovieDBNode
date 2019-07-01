import { createSelector } from 'reselect'
import { DropdownItemProps } from 'semantic-ui-react'

import { ILanguage, IQueryCountInfo } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

export interface ILanguageMap {
    [id: string]: ILanguage
}

export interface ILanguageCountMap {
    [id: string]: IQueryCountInfo
}

export const getLanguageMap = createSelector(
    (state: IClientState) => state.language.all,
    (all): ILanguageMap => {
        const map: ILanguageMap = {}

        all.forEach(l => (map[l._id] = l))

        return map
    },
)

export const getLanguageCountMap = createSelector(
    (state: IClientState) => state.recording.languageInfo,
    (all): ILanguageCountMap => {
        const map: ILanguageCountMap = {}

        all.forEach(l => (map[l._id] = l))

        return map
    },
)

export const getLanguageOptions = createSelector(
    (state: IClientState) => state.language.all,
    getLanguageCountMap,
    (all, counts): DropdownItemProps[] => {
        const options: DropdownItemProps[] = all
            .map(l => {
                const info = counts[l._id]

                return info && info.count && { key: l._id, sort: l.name || l._id, text: l.name || l._id, value: l._id }
            })
            .filter(o => o)

        options.sort((l, r) => l.sort.localeCompare(r.sort))

        return options
    },
)

export const getAllLanguageOptions = createSelector(
    (state: IClientState) => state.language.all,
    (all): DropdownItemProps[] =>
        all
            .map(l => <DropdownItemProps>{ key: l._id, sort: l.name || l._id, text: l.name || l._id, value: l._id })
            .sort((l, r) => l.sort.localeCompare(r.sort)),
)
