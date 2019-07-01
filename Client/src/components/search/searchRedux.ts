import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './search'

import { ContainerActions, RecordingActions, SeriesActions } from '../../controller'

function mapContainerProps(state: IClientState, props: local.ISearchUiProps): local.ISearchProps {
    return {
        hint: state.mui.search,
        text: state.container.filter,
    }
}

function mapContainerActions(dispatch: Dispatch<Action>, props: local.ISearchUiProps): local.ISearchActions {
    return {
        setText: text => dispatch(ContainerActions.setFilter(text)),
    }
}

function mapSeriesProps(state: IClientState, props: local.ISearchUiProps): local.ISearchProps {
    return {
        hint: state.mui.search,
        text: state.series.filter,
    }
}

function mapSeriesActions(dispatch: Dispatch<Action>, props: local.ISearchUiProps): local.ISearchActions {
    return {
        setText: text => dispatch(SeriesActions.setFilter(text)),
    }
}

function mapRecordingProps(state: IClientState, props: local.ISearchUiProps): local.ISearchProps {
    return {
        hint: state.mui.search,
        text: state.recording.search,
    }
}

function mapRecordingActions(dispatch: Dispatch<Action>, props: local.ISearchUiProps): local.ISearchActions {
    return {
        setText: text => dispatch(RecordingActions.filterText(text)),
    }
}

export const ContainerSearch = connect(
    mapContainerProps,
    mapContainerActions,
)(local.CSearch)

export const SeriesSearch = connect(
    mapSeriesProps,
    mapSeriesActions,
)(local.CSearch)

export const RecordingSearch = connect(
    mapRecordingProps,
    mapRecordingActions,
)(local.CSearch)
