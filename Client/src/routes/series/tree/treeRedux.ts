import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './tree'

function mapStateToProps(state: IClientState, props: local.ISeriesTreeUiProps): local.ISeriesTreeProps {
    return {}
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.ISeriesTreeUiProps): local.ISeriesTreeActions {
    return {}
}

export const SeriesTree = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CSeriesTree)
