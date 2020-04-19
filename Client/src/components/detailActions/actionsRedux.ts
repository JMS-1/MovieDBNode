import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './actions'

import * as controller from '../../controller'

function mapContainerProps(
    state: IClientState,
    props: local.IDetailActionsLegacyUiProps
): local.IDetailActionsLegacyProps {
    const route = state.container
    const container = controller.getContainerEdit(state)
    const errors = route.validation

    return {
        cancelLabel: container && container._id ? state.mui.reset : state.mui.cancel,
        deleteLabel: state.mui.remove,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        saveLabel: state.mui.save,
        showDelete: container && !!container._id,
    }
}

function mapContainerActions(
    dispatch: Dispatch<Action>,
    props: local.IDetailActionsLegacyUiProps
): local.IDetailActionsLegacyActions {
    return {
        cancel: () => dispatch(controller.ContainerActions.cancelEdit()),
        confirmDelete: () => dispatch(controller.ContainerActions.confirmDelete()),
        save: () => dispatch(controller.ContainerActions.save()),
    }
}

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

export const ContainerDetailActions = connect(mapContainerProps, mapContainerActions)(local.CDetailActionsLegacy)

export const SeriesDetailActions = connect(mapSeriesProps, mapSeriesActions)(local.CDetailActionsLegacy)
