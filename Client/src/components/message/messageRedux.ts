import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './message'

function mapStateToProps(state: IClientState, props: local.IReportErrorUiProps): local.IReportErrorProps {
    return {
        title: state.mui.validationError,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IReportErrorUiProps): local.IReportErrorActions {
    return {}
}

export const ReportError = connect(
    mapStateToProps,
    mapDispatchToProps
)(local.CReportError)
