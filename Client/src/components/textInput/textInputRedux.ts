import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IRecording } from 'movie-db-api'

import * as local from './textInput'

import * as controller from '../../controller'

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

export const RecordingTextInput = connect(
    CRecordingTextInput.mapProps,
    CRecordingTextInput.mapActions
)(CRecordingTextInput)
