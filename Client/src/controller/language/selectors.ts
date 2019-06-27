import { createSelector } from 'reselect'

import { ILanguage } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

export interface ILanguageMap {
    [id: string]: ILanguage
}

export const getLanguageMap = createSelector(
    (state: IClientState) => state.language.all,
    (all): ILanguageMap => {
        const map: ILanguageMap = {}

        all.forEach(l => (map[l._id] = l))

        return map
    },
)
