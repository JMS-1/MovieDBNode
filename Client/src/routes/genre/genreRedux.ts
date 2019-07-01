import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './genre'

function mapStateToProps(state: IClientState, props: local.IGenreRouteUiProps): local.IGenreRouteProps {
    return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IGenreRouteUiProps): local.IGenreRouteActions {
    return {}
}

export const GenreRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CGenreRoute)
