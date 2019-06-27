import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './recording'

function mapStateToProps(state: IClientState, props: local.IRecordingRouteUiProps): local.IRecordingRouteProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingRouteUiProps,
): local.IRecordingRouteActions {
    return {}
}

export const RecordingRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecordingRoute)
