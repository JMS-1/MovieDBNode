import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { LanguageActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.ILanguageDetailsUiProps): local.ILanguageDetailsProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ILanguageDetailsUiProps
): local.ILanguageDetailsActions {
    return {
        loadDetails: id => dispatch(LanguageActions.select(id)),
    }
}

export const LanguageDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(local.CLanguageDetails)
