import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './search'

import { RecordingActions, SeriesActions } from '../../controller'

function mapSeriesProps(state: IClientState, props: local.ILegacySearchUiProps): local.ILegacySearchProps {
    return {
        hint: state.mui.search,
        text: state.series.filter,
    }
}

function mapSeriesActions(dispatch: Dispatch<Action>, props: local.ILegacySearchUiProps): local.ILegacySearchActions {
    return {
        setText: (text) => dispatch(SeriesActions.setFilter(text)),
    }
}

function mapRecordingProps(state: IClientState, props: local.ILegacySearchUiProps): local.ILegacySearchProps {
    return {
        hint: state.mui.search,
        text: state.recording.search,
    }
}

function mapRecordingActions(
    dispatch: Dispatch<Action>,
    props: local.ILegacySearchUiProps
): local.ILegacySearchActions {
    return {
        setText: (text) => dispatch(RecordingActions.filterText(text)),
    }
}

export const SeriesSearch = connect(mapSeriesProps, mapSeriesActions)(local.CLegacySearch)

export const RecordingSearch = connect(mapRecordingProps, mapRecordingActions)(local.CLegacySearch)
