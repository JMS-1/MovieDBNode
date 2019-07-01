import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

function mapStateToProps(state: IClientState, props: local.ISeriesDetailsUiProps): local.ISeriesDetailsProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ISeriesDetailsUiProps,
): local.ISeriesDetailsActions {
    return {}
}

export const SeriesDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CSeriesDetails)
