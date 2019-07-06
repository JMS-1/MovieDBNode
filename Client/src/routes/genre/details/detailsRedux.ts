import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { GenreActions, getGenreEdit } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IGenreDetailsUiProps): local.IGenreDetailsProps {
    const route = state.genre
    const genre = getGenreEdit(state)
    const errors = route.validation

    return {
        hasError: errors && errors.length > 0,
        lost: !genre,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IGenreDetailsUiProps): local.IGenreDetailsActions {
    return {
        loadDetails: id => dispatch(GenreActions.select(id)),
    }
}

export const GenreDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CGenreDetails)
