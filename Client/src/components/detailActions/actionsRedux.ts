import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './actions'

import * as controller from '../../controller'

function mapContainerProps(state: IClientState, props: local.IDetailActionsUiProps): local.IDetailActionsProps {
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
    props: local.IDetailActionsUiProps,
): local.IDetailActionsActions {
    return {
        cancel: () => dispatch(controller.ContainerActions.cancelEdit()),
        confirmDelete: () => dispatch(controller.ContainerActions.confirmDelete()),
        save: () => dispatch(controller.ContainerActions.save()),
    }
}

function mapLanguageProps(state: IClientState, props: local.IDetailActionsUiProps): local.IDetailActionsProps {
    const route = state.language
    const language = controller.getLanguageEdit(state)
    const errors = route.validation

    return {
        cancelLabel: language && language._id ? state.mui.reset : state.mui.cancel,
        deleteLabel: state.mui.remove,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        saveLabel: state.mui.save,
        showDelete: language && !!language._id,
    }
}

function mapLanguageActions(
    dispatch: Dispatch<Action>,
    props: local.IDetailActionsUiProps,
): local.IDetailActionsActions {
    return {
        cancel: () => dispatch(controller.LanguageActions.cancelEdit()),
        confirmDelete: () => dispatch(controller.LanguageActions.confirmDelete()),
        save: () => dispatch(controller.LanguageActions.save()),
    }
}

function mapGenreProps(state: IClientState, props: local.IDetailActionsUiProps): local.IDetailActionsProps {
    const route = state.genre
    const genre = controller.getGenreEdit(state)
    const errors = route.validation

    return {
        cancelLabel: genre && genre._id ? state.mui.reset : state.mui.cancel,
        deleteLabel: state.mui.remove,
        hasChanges: !!route.workingCopy,
        hasError: errors && errors.length > 0,
        saveLabel: state.mui.save,
        showDelete: genre && !!genre._id,
    }
}

function mapGenreActions(dispatch: Dispatch<Action>, props: local.IDetailActionsUiProps): local.IDetailActionsActions {
    return {
        cancel: () => dispatch(controller.GenreActions.cancelEdit()),
        confirmDelete: () => dispatch(controller.GenreActions.confirmDelete()),
        save: () => dispatch(controller.GenreActions.save()),
    }
}

function mapSeriesProps(state: IClientState, props: local.IDetailActionsUiProps): local.IDetailActionsProps {
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

function mapSeriesActions(dispatch: Dispatch<Action>, props: local.IDetailActionsUiProps): local.IDetailActionsActions {
    return {
        cancel: () => dispatch(controller.SeriesActions.cancelEdit()),
        confirmDelete: () => dispatch(controller.SeriesActions.confirmDelete()),
        save: () => dispatch(controller.SeriesActions.save()),
    }
}

export const ContainerDetailActions = connect(
    mapContainerProps,
    mapContainerActions,
)(local.CDetailActions)

export const LanguageDetailActions = connect(
    mapLanguageProps,
    mapLanguageActions,
)(local.CDetailActions)

export const GenreDetailActions = connect(
    mapGenreProps,
    mapGenreActions,
)(local.CDetailActions)

export const SeriesDetailActions = connect(
    mapSeriesProps,
    mapSeriesActions,
)(local.CDetailActions)
