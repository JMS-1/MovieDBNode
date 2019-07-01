import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import { getSeriesEdit, getSeriesOptionsNoEdit, SeriesActions } from '../../../controller'

function mapStateToProps(state: IClientState, props: local.ISeriesDetailsUiProps): local.ISeriesDetailsProps {
    const mui = state.mui.series
    const emui = mui.edit
    const route = state.series
    const series = getSeriesEdit(state)
    const errors = route.validation

    return {
        cancelLabel: series && series._id ? state.mui.cancel : state.mui.reset,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        lost: !series,
        saveLabel: state.mui.save,
        parent: series && series.parentId,
        parentHint: mui.noParent,
        parentLabel: emui.parentId,
        parentOptions: getSeriesOptionsNoEdit(state),
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ISeriesDetailsUiProps
): local.ISeriesDetailsActions {
    return {
        cancel: () => dispatch(SeriesActions.cancelEdit()),
        loadDetails: id => dispatch(SeriesActions.select(id)),
        save: () => dispatch(SeriesActions.save()),
        setProp: (prop, value) => dispatch(SeriesActions.setProperty(prop, value)),
    }
}

export const SeriesDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(local.CSeriesDetails)
