import { createSelector } from 'reselect'

import { IRecording } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

export interface IRecordingMap {
    [id: string]: IRecording
}

export const getRecordingMap = createSelector(
    (state: IClientState) => state.recording.all,
    (all): IRecordingMap => {
        const map: IRecordingMap = {}

        all.forEach(r => (map[r._id] = r))

        return map
    },
)
