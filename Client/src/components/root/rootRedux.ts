import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './root'

function mapStateToProps(state: IClientState, props: local.IRootUiProps): local.IRootProps {
    const busy = Date.now() - state.application.busySince
    const requests = state.application.requests

    return {
        busy: requests > 1 || (requests > 0 && busy >= 250),
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRootUiProps): local.IRootActions {
    return {}
}

export const Root = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRoot)
