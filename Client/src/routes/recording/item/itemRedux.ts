import { routerActions } from 'connected-react-router'
import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './item'

import { getGenreMap, getLanguageMap, getRecordingMap } from '../../../controller'
import { routes } from '../../../stores/routes'

function makeNumber(n: number): string {
    return n < 10 ? `0${n}` : `${n}`
}

function makeTime(date: Date): string {
    return `${makeNumber(date.getDate())}.${makeNumber(1 + date.getMonth())}.${date.getFullYear()} ${makeNumber(
        date.getHours()
    )}:${makeNumber(date.getMinutes())}:${makeNumber(date.getSeconds())}`
}

const none: string[] = []

function mapStateToProps(state: IClientState, props: local.IRecordingItemUiProps): local.IRecordingItemProps {
    const recording = getRecordingMap(state)[props.id]

    return {
        created: recording && makeTime(new Date(recording.created)),
        genreMap: getGenreMap(state),
        genres: (recording && recording.genres) || none,
        languageMap: getLanguageMap(state),
        languages: (recording && recording.languages) || none,
        name: recording && recording.fullName,
        rentTo: recording && recording.rentTo,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingItemUiProps
): local.IRecordingItemActions {
    return {
        select: () => dispatch(routerActions.push(`${routes.recording}/${props.id}`)),
    }
}

export const RecordingItem = connect(mapStateToProps, mapDispatchToProps)(local.CRecordingItem)
