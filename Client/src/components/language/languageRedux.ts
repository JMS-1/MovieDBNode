import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './language'

import { getLanguageMap } from '../../controller'

function mapStateToProps(state: IClientState, props: local.ILanguageUiProps): local.ILanguageProps {
    const language = getLanguageMap(state)[props.id]

    return {
        name: (language && language.name) || props.id,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.ILanguageUiProps): local.ILanguageActions {
    return {}
}

export const Language = connect(mapStateToProps, mapDispatchToProps)(local.CLanguage)
