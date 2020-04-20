import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IRecording, ISeries } from 'movie-db-api'

import * as local from './textInput'

import * as controller from '../../controller'

class CSeriesTextInput extends local.CTextInputLegacy<ISeries> {
    static mapProps(state: IClientState, props: local.ITextInputLegacyUiProps<ISeries>): local.ITextInputLegacyProps {
        const route = state.series
        const series = controller.getSeriesEdit(state)
        const value = series && series[props.prop]

        return {
            errors: controller.getErrors(route.validation, new RegExp(`^${props.prop}$`)),
            label: state.mui.series.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputLegacyUiProps<ISeries>
    ): local.ITextInputLegacyActions<ISeries> {
        return {
            setValue: (prop, value) => dispatch(controller.SeriesActions.setProperty(prop, value)),
        }
    }
}

class CRecordingTextInput extends local.CTextInputLegacy<IRecording> {
    static mapProps(
        state: IClientState,
        props: local.ITextInputLegacyUiProps<IRecording>
    ): local.ITextInputLegacyProps {
        const route = state.recording
        const edit = controller.getRecordingEdit(state)
        const value = edit && edit[props.prop]

        return {
            errors: controller.getErrors(route.validation, new RegExp(`^${props.prop}$`)),
            label: state.mui.recording.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputLegacyUiProps<IRecording>
    ): local.ITextInputLegacyActions<IRecording> {
        return {
            setValue: (prop, value) => dispatch(controller.RecordingActions.setProperty(prop, value)),
        }
    }
}

export const SeriesTextInput = connect(CSeriesTextInput.mapProps, CSeriesTextInput.mapActions)(CSeriesTextInput)

export const RecordingTextInput = connect(
    CRecordingTextInput.mapProps,
    CRecordingTextInput.mapActions
)(CRecordingTextInput)
