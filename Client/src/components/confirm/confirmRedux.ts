import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './confirm'

import * as controller from '../../controller'

function mapLanguageProps(state: IClientState, props: local.IDeleteConfirmUiProps): local.IDeleteConfirmProps {
    const mui = state.mui

    return {
        html: mui.language.confirmHtml,
        no: mui.no,
        open: state.language.deleteOpen,
        title: mui.confirm,
        yes: mui.yes,
    }
}

function mapLanguageActions(
    dispatch: Dispatch<Action>,
    props: local.IDeleteConfirmUiProps,
): local.IDeleteConfirmActions {
    return {
        confirm: () => dispatch(controller.LanguageActions.confirmDeleteDone(true)),
        reject: () => dispatch(controller.LanguageActions.confirmDeleteDone(false)),
    }
}

function mapContainerProps(state: IClientState, props: local.IDeleteConfirmUiProps): local.IDeleteConfirmProps {
    const mui = state.mui

    return {
        html: mui.container.confirmHtml,
        no: mui.no,
        open: state.container.deleteOpen,
        title: mui.confirm,
        yes: mui.yes,
    }
}

function mapContainerActions(
    dispatch: Dispatch<Action>,
    props: local.IDeleteConfirmUiProps,
): local.IDeleteConfirmActions {
    return {
        confirm: () => dispatch(controller.ContainerActions.confirmDeleteDone(true)),
        reject: () => dispatch(controller.ContainerActions.confirmDeleteDone(false)),
    }
}

function mapGenreProps(state: IClientState, props: local.IDeleteConfirmUiProps): local.IDeleteConfirmProps {
    const mui = state.mui

    return {
        html: mui.genre.confirmHtml,
        no: mui.no,
        open: state.genre.deleteOpen,
        title: mui.confirm,
        yes: mui.yes,
    }
}

function mapGenreActions(dispatch: Dispatch<Action>, props: local.IDeleteConfirmUiProps): local.IDeleteConfirmActions {
    return {
        confirm: () => dispatch(controller.GenreActions.confirmDeleteDone(true)),
        reject: () => dispatch(controller.GenreActions.confirmDeleteDone(false)),
    }
}

function mapRecordingProps(state: IClientState, props: local.IDeleteConfirmUiProps): local.IDeleteConfirmProps {
    const mui = state.mui

    return {
        html: mui.recording.confirmHtml,
        no: mui.no,
        open: state.recording.deleteOpen,
        title: mui.confirm,
        yes: mui.yes,
    }
}

function mapRecordingActions(
    dispatch: Dispatch<Action>,
    props: local.IDeleteConfirmUiProps,
): local.IDeleteConfirmActions {
    return {
        confirm: () => dispatch(controller.RecordingActions.confirmDeleteDone(true)),
        reject: () => dispatch(controller.RecordingActions.confirmDeleteDone(false)),
    }
}

function mapSeriesProps(state: IClientState, props: local.IDeleteConfirmUiProps): local.IDeleteConfirmProps {
    const mui = state.mui

    return {
        html: mui.series.confirmHtml,
        no: mui.no,
        open: state.series.deleteOpen,
        title: mui.confirm,
        yes: mui.yes,
    }
}

function mapSeriesActions(dispatch: Dispatch<Action>, props: local.IDeleteConfirmUiProps): local.IDeleteConfirmActions {
    return {
        confirm: () => dispatch(controller.SeriesActions.confirmDeleteDone(true)),
        reject: () => dispatch(controller.SeriesActions.confirmDeleteDone(false)),
    }
}

export const ConfirmDeleteLanguage = connect(
    mapLanguageProps,
    mapLanguageActions,
)(local.CDeleteConfirm)

export const ConfirmDeleteContainer = connect(
    mapContainerProps,
    mapContainerActions,
)(local.CDeleteConfirm)

export const ConfirmDeleteGenre = connect(
    mapGenreProps,
    mapGenreActions,
)(local.CDeleteConfirm)

export const ConfirmDeleteRecording = connect(
    mapRecordingProps,
    mapRecordingActions,
)(local.CDeleteConfirm)

export const ConfirmDeleteSeries = connect(
    mapSeriesProps,
    mapSeriesActions,
)(local.CDeleteConfirm)
