import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { getLanguageEdit, LanguageActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.ILanguageDetailsUiProps): local.ILanguageDetailsProps {
    const route = state.language
    const language = getLanguageEdit(state)
    const errors = route.validation

    return {
        cancelLabel: language && language._id ? state.mui.cancel : state.mui.reset,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        lost: !language,
        saveLabel: state.mui.save,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ILanguageDetailsUiProps
): local.ILanguageDetailsActions {
    return {
        cancel: () => dispatch(LanguageActions.cancelEdit()),
        loadDetails: id => dispatch(LanguageActions.select(id)),
        save: () => dispatch(LanguageActions.save()),
    }
}

export const LanguageDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(local.CLanguageDetails)
