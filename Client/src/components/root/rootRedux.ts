import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './root'

import { ApplicationActions } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IRootUiProps): local.IRootProps {
    const route = state.application

    return {
        errors: route.errors,
        theme: state.application.theme,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRootUiProps): local.IRootActions {
    return {
        clearErrors: () => dispatch(ApplicationActions.clearErrors()),
        setTheme: (theme) => dispatch(ApplicationActions.setTheme(theme)),
    }
}

export const Root = connect(mapStateToProps, mapDispatchToProps)(local.CRoot)
