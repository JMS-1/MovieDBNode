import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

function mapStateToProps(state: IClientState, props: local.IRecordingUiProps): local.IRecordingProps {
    return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRecordingUiProps): local.IRecordingActions {
    return {}
}

export const Recording = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecording)
