import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './root'

import { ApplicationActions } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRootUiProps): local.IRootProps {
    const route = state.application
    const busy = Date.now() - route.busySince
    const requests = route.requests

    return {
        busy: requests > 1 || (requests > 0 && busy >= 250),
        errors: route.errors,
        title: state.mui.webError,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRootUiProps): local.IRootActions {
    return {
        clearErrors: () => dispatch(ApplicationActions.clearErrors()),
    }
}

export const Root = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRoot)
