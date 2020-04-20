import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import * as local from './confirm'

import * as controller from '../../controller'

function mapRecordingProps(
    state: IClientState,
    props: local.IDeleteConfirmLegacyUiProps
): local.IDeleteConfirmLegacyProps {
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
    props: local.IDeleteConfirmLegacyUiProps
): local.IDeleteConfirmLegacyActions {
    return {
        confirm: () => dispatch(controller.RecordingActions.confirmDeleteDone(true)),
        reject: () => dispatch(controller.RecordingActions.confirmDeleteDone(false)),
    }
}

function mapSeriesProps(
    state: IClientState,
    props: local.IDeleteConfirmLegacyUiProps
): local.IDeleteConfirmLegacyProps {
    const mui = state.mui

    return {
        html: mui.series.confirmHtml,
        no: mui.no,
        open: state.series.deleteOpen,
        title: mui.confirm,
        yes: mui.yes,
    }
}

function mapSeriesActions(
    dispatch: Dispatch<Action>,
    props: local.IDeleteConfirmLegacyUiProps
): local.IDeleteConfirmLegacyActions {
    return {
        confirm: () => dispatch(controller.SeriesActions.confirmDeleteDone(true)),
        reject: () => dispatch(controller.SeriesActions.confirmDeleteDone(false)),
    }
}

export const ConfirmDeleteRecording = connect(mapRecordingProps, mapRecordingActions)(local.CDeleteConfirmLegacy)

export const ConfirmDeleteSeries = connect(mapSeriesProps, mapSeriesActions)(local.CDeleteConfirmLegacy)
