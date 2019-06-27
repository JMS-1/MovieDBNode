import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './root'

import { ApplicationActions } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRootUiProps): local.IRootProps {
    const route = state.application

    return {
        busy: route.requests > 0,
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
