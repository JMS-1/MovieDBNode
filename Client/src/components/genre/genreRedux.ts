import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './genre'

import { getGenreMap } from '../../controller'

function mapStateToProps(state: IClientState, props: local.IGenreUiProps): local.IGenreProps {
    const genre = getGenreMap(state)[props.id]

    return {
        name: (genre && genre.name) || props.id,
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IGenreUiProps): local.IGenreActions {
    return {}
}

export const Genre = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CGenre)
