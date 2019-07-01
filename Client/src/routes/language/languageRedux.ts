import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './language'

function mapStateToProps(state: IClientState, props: local.ILanguageRouteUiProps): local.ILanguageRouteProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ILanguageRouteUiProps,
): local.ILanguageRouteActions {
    return {}
}

export const LanguageRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CLanguageRoute)
