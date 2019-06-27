import { createSelector } from 'reselect'

import { IRecordingInfo } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

export interface IRecordingMap {
    [id: string]: IRecordingInfo
}

export const getRecordingMap = createSelector(
    (state: IClientState) => state.recording.all,
    (all): IRecordingMap => {
        const map: IRecordingMap = {}

        all.forEach(r => (map[r._id] = r))

        return map
    },
)

export const getRecordings = createSelector(
    (state: IClientState) => state.recording.all,
    (all): string[] => all.map(r => r._id),
)
