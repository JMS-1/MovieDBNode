import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { RecordingActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IRecordingUiProps): local.IRecordingProps {
    const mui = state.mui.recording
    const emui = mui.edit

    return {
        idLabel: emui._id,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRecordingUiProps): local.IRecordingActions {
    return {
        loadRecording: () => dispatch(RecordingActions.select(props.match.params.id)),
    }
}

export const Recording = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecording)
