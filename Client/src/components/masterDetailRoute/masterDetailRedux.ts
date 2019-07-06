import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './masterDetail'

function mapStateToProps(state: IClientState, props: local.IMasterDetailRouteUiProps): local.IMasterDetailRouteProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IMasterDetailRouteUiProps,
): local.IMasterDetailRouteActions {
    return {}
}

export const MasterDetailRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CMasterDetailRoute)
