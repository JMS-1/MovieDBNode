import { createSelector } from 'reselect'
import { DropdownItemProps } from 'semantic-ui-react'

import { IRecordingInfo, mediaType } from 'movie-db-api'
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

export const getRentOptions = createSelector(
    (state: IClientState) => state.mui.recording,
    (mui): DropdownItemProps[] => [
        { key: '1', text: mui.yesRent, value: '1' },
        { key: '0', text: mui.noRent, value: '0' },
    ],
)

export const getRecordingEdit = createSelector(
    (state: IClientState) => state.recording.workingCopy,
    (state: IClientState) => state.recording.edit,
    (copy, initial) => copy || (typeof initial !== 'string' && initial),
)

const optionOrder: mediaType[] = [
    mediaType.Undefined,
    mediaType.VideoCD,
    mediaType.SuperVideoCD,
    mediaType.RecordedDVD,
    mediaType.DVD,
    mediaType.BluRay,
]

export const getMediaTypeOptions = createSelector(
    (state: IClientState) => state.mui.media.types,
    (mui): DropdownItemProps[] => optionOrder.map(t => <DropdownItemProps>{ key: t, text: mui[t], value: t }),
)
