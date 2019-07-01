import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './series'

function mapStateToProps(state: IClientState, props: local.ISeriesRouteUiProps): local.ISeriesRouteProps {
    return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.ISeriesRouteUiProps): local.ISeriesRouteActions {
    return {}
}

export const SeriesRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CSeriesRoute)
