import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './genre'

import { getAllGenreOptions } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IGenreRouteUiProps): local.IGenreRouteProps {
    return {
        genreOptions: getAllGenreOptions(state),
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IGenreRouteUiProps): local.IGenreRouteActions {
    return {}
}

export const GenreRoute = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CGenreRoute)
