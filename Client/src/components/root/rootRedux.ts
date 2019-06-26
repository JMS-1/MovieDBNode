import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './root'

function mapStateToProps(state: IClientState, props: local.IRootUiProps): local.IRootProps {
    return {
        busy: state.application.requests > 0,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRootUiProps): local.IRootActions {
    return {}
}

export const Root = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRoot)
