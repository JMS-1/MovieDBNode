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
        cancelLabel: genre && genre._id ? state.mui.reset : state.mui.cancel,
        deleteLabel: state.mui.remove,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        lost: !genre,
        saveLabel: state.mui.save,
        showDelete: genre && !!genre._id,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IGenreDetailsUiProps): local.IGenreDetailsActions {
    return {
        cancel: () => dispatch(GenreActions.cancelEdit()),
        confirmDelete: () => dispatch(GenreActions.confirmDelete()),
        loadDetails: id => dispatch(GenreActions.select(id)),
        save: () => dispatch(GenreActions.save()),
    }
}

export const GenreDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CGenreDetails)
