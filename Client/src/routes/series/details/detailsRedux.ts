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
        cancelLabel: series && series._id ? state.mui.reset : state.mui.cancel,
        deleteLabel: state.mui.remove,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        lost: !series,
        parent: series && series.parentId,
        parentHint: mui.noParent,
        parentLabel: emui.parentId,
        parentOptions: getSeriesOptionsNoEdit(state),
        saveLabel: state.mui.save,
        showDelete: series && !!series._id,
    }
}

function mapDispatchToProps(
    dispatch: Dispatch<Action>,
    props: local.ISeriesDetailsUiProps,
): local.ISeriesDetailsActions {
    return {
        cancel: () => dispatch(SeriesActions.cancelEdit()),
        confirmDelete: () => dispatch(SeriesActions.confirmDelete()),
        loadDetails: id => dispatch(SeriesActions.select(id)),
        save: () => dispatch(SeriesActions.save()),
        setProp: (prop, value) => dispatch(SeriesActions.setProperty(prop, value)),
    }
}

export const SeriesDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CSeriesDetails)
