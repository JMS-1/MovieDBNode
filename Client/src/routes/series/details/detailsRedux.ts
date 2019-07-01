import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { SeriesActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.ISeriesDetailsUiProps): local.ISeriesDetailsProps {
    return {}
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ISeriesDetailsUiProps,
): local.ISeriesDetailsActions {
    return {
        loadDetails: id => dispatch(SeriesActions.select(id)),
    }
}

export const SeriesDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CSeriesDetails)
