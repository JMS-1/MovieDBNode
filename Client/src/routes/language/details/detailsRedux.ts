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
        hasError: errors && errors.length > 0,
        lost: !language,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ILanguageDetailsUiProps,
): local.ILanguageDetailsActions {
    return {
        loadDetails: id => dispatch(LanguageActions.select(id)),
    }
}

export const LanguageDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CLanguageDetails)
