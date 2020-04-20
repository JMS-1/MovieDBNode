import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './actions'

import * as controller from '../../controller'

function mapSeriesProps(
    state: IClientState,
    props: local.IDetailActionsLegacyUiProps
): local.IDetailActionsLegacyProps {
    const route = state.series
    const series = controller.getSeriesEdit(state)
    const errors = route.validation

    return {
        cancelLabel: series && series._id ? state.mui.reset : state.mui.cancel,
        deleteLabel: state.mui.remove,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        saveLabel: state.mui.save,
        showDelete: series && !!series._id,
    }
}

function mapSeriesActions(
    dispatch: Dispatch<Action>,
    props: local.IDetailActionsLegacyUiProps
): local.IDetailActionsLegacyActions {
    return {
        cancel: () => dispatch(controller.SeriesActions.cancelEdit()),
        confirmDelete: () => dispatch(controller.SeriesActions.confirmDelete()),
        save: () => dispatch(controller.SeriesActions.save()),
    }
}

export const SeriesDetailActions = connect(mapSeriesProps, mapSeriesActions)(local.CDetailActionsLegacy)
