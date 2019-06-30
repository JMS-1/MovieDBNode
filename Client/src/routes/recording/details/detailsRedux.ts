import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IClientState } from 'movie-db-client'

import * as local from './details'

import * as controller from '../../../controller'

const noSelection: string[] = []

function mapStateToProps(state: IClientState, props: local.IRecordingUiProps): local.IRecordingProps {
    const mui = state.mui.recording
    const emui = mui.edit
    const route = state.recording
    const edit = controller.getRecordingEdit(state)

    return {
        cancelLabel: state.mui.cancel,
        genreHint: mui.editGenres,
        genreLabel: emui.genres,
        genreOptions: controller.getAllGenreOptions(state),
        genres: (edit && edit.genres) || noSelection,
        hasChanges: !!route.workingCopy,
        hasError: route.validation && route.validation.length > 0,
        idLabel: emui._id,
        languageHint: mui.editLanguages,
        languageLabel: emui.languages,
        languageOptions: controller.getAllLanguageOptions(state),
        languages: (edit && edit.languages) || noSelection,
        saveAndBackLabel: mui.saveAndBack,
        series: edit && edit.series,
        seriesHint: mui.editSeries,
        seriesLabel: emui.series,
        seriesOptions: controller.getSeriesOptions(state),
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>, props: local.IRecordingUiProps): local.IRecordingActions {
    return {
        cancel: () => dispatch(controller.RecordingActions.cancelEdit()),
        loadRecording: () => dispatch(controller.RecordingActions.select(props.match.params.id)),
        saveAndBack: () => dispatch(controller.RecordingActions.save('list')),
        setProp: (prop, value) => dispatch(controller.RecordingActions.setProperty(prop, value)),
    }
}

export const Recording = connect(
    mapStateToProps,
    mapDispatchToProps,
)(local.CRecording)
