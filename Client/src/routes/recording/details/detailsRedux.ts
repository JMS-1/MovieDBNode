import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { getRecordingEdit, getSeriesOptions, RecordingActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IRecordingUiProps): local.IRecordingProps {
    const mui = state.mui.recording
    const emui = mui.edit
    const route = state.recording
    const edit = getRecordingEdit(state)

    return {
        cancelLabel: state.mui.cancel,
        hasChanges: !!route.workingCopy,
        hasError: route.validation && route.validation.length > 0,
        idLabel: emui._id,
        saveAndBackLabel: mui.saveAndBack,
        series: edit && edit.series,
        seriesLabel: emui.series,
        seriesOptions: getSeriesOptions(state),
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRecordingUiProps): local.IRecordingActions {
    return {
        cancel: () => dispatch(RecordingActions.cancelEdit()),
        loadRecording: () => dispatch(RecordingActions.select(props.match.params.id)),
        saveAndBack: () => dispatch(RecordingActions.save('list')),
        setProp: (prop, value) => dispatch(RecordingActions.setProperty(prop, value)),
    }
}

export const Recording = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecording)
