import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IContainer, IRecording } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

import * as local from './textInput'

import * as controller from '../../controller'

class CContainerTextInput extends local.CTextInput<IContainer> {
    static mapProps(state: IClientState, props: local.ITextInputUiProps<IContainer>): local.ITextInputProps {
        const route = state.container
        const edit = controller.getContainerEdit(state)
        const value = edit && edit[props.prop]

        return {
            errors: controller.getErrors(route.validation, props.prop, edit),
            label: state.mui.container.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputUiProps<IContainer>,
    ): local.ITextInputActions<IContainer> {
        return {
            setValue: (prop, value) => dispatch(controller.ContainerActions.setProperty(prop, value)),
        }
    }
}

class CRecordingTextInput extends local.CTextInput<IRecording> {
    static mapProps(state: IClientState, props: local.ITextInputUiProps<IRecording>): local.ITextInputProps {
        const route = state.recording
        const edit = controller.getRecordingEdit(state)
        const value = edit && edit[props.prop]

        return {
            errors: controller.getErrors(route.validation, props.prop, edit),
            label: state.mui.recording.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputUiProps<IRecording>,
    ): local.ITextInputActions<IRecording> {
        return {
            setValue: (prop, value) => dispatch(controller.RecordingActions.setProperty(prop, value)),
        }
    }
}

export const ContainerTextInput = connect(
    CContainerTextInput.mapProps,
    CContainerTextInput.mapActions,
)(CContainerTextInput)

export const RecordingTextInput = connect(
    CRecordingTextInput.mapProps,
    CRecordingTextInput.mapActions,
)(CRecordingTextInput)
