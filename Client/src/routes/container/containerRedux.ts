import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './container'

function mapStateToProps(state: IClientState, props: local.IContainerRouteUiProps): local.IContainerRouteProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.IContainerRouteUiProps,
): local.IContainerRouteActions {
    return {}
}

export const ContainerRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CContainerRoute)
