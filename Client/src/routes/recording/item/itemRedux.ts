import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './item'

import { getRecordingMap } from '../../../controller'

function makeNumber(n: number): string {
    return n < 10 ? `0${n}` : `${n}`
}

function makeTime(date: Date): string {
    return `${makeNumber(date.getDate())}.${makeNumber(1 + date.getMonth())}.${date.getFullYear()} ${makeNumber(
        date.getHours(),
    )}:${makeNumber(date.getMinutes())}:${makeNumber(date.getSeconds())}`
}

const none: string[] = []

function mapStateToProps(state: IClientState, props: local.IRecordingItemUiProps): local.IRecordingItemProps {
    const recording = getRecordingMap(state)[props.id]

    return {
        name: recording && recording.fullName,
        rentTo: recording && recording.rentTo,
        created: recording && makeTime(new Date(recording.created)),
        genres: (recording && recording.genres) || none,
        languages: (recording && recording.languages) || none,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingItemUiProps,
): local.IRecordingItemActions {
    return {}
}

export const RecordingItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecordingItem)
