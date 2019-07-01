import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { GenreActions, getGenreEdit } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.IGenreDetailsUiProps): local.IGenreDetailsProps {
    const mui = state.mui.genre
    const emui = mui.edit
    const route = state.genre
    const genre = getGenreEdit(state)
    const errors = route.validation

    return {
        cancelLabel: genre && genre._id ? state.mui.cancel : state.mui.reset,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        idLabel: emui._id,
        lost: !genre,
        realId: (genre && genre._id) || mui.noId,
        saveLabel: state.mui.save,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IGenreDetailsUiProps): local.IGenreDetailsActions {
    return {
        cancel: () => dispatch(GenreActions.cancelEdit()),
        loadDetails: id => dispatch(GenreActions.select(id)),
        save: () => dispatch(GenreActions.save()),
    }
}

export const GenreDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CGenreDetails)
