import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './links'

function mapStateToProps(state: IClientState, props: local.IRecordingLinksUiProps): local.IRecordingLinksProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IRecordingLinksUiProps,
): local.IRecordingLinksActions {
    return {}
}

export const RecordingLinks = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecordingLinks)
