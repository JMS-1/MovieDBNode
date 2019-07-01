import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IContainer, IGenre, ILanguage, IRecording, ISeries } from 'movie-db-api'
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

class CGenreTextInput extends local.CTextInput<IGenre> {
    static mapProps(state: IClientState, props: local.ITextInputUiProps<IGenre>): local.ITextInputProps {
        const route = state.genre
        const genre = controller.getGenreEdit(state)
        const value = genre && genre[props.prop]

        return {
            errors: controller.getErrors(route.validation, props.prop, genre),
            label: state.mui.genre.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputUiProps<IGenre>,
    ): local.ITextInputActions<IGenre> {
        return {
            setValue: (prop, value) => dispatch(controller.GenreActions.setProperty(prop, value)),
        }
    }
}

class CSeriesTextInput extends local.CTextInput<ISeries> {
    static mapProps(state: IClientState, props: local.ITextInputUiProps<ISeries>): local.ITextInputProps {
        const route = state.genre
        const series = controller.getSeriesEdit(state)
        const value = series && series[props.prop]

        return {
            errors: controller.getErrors(route.validation, props.prop, series),
            label: state.mui.series.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputUiProps<ISeries>,
    ): local.ITextInputActions<ISeries> {
        return {
            setValue: (prop, value) => dispatch(controller.SeriesActions.setProperty(prop, value)),
        }
    }
}

class CLanguageTextInput extends local.CTextInput<ILanguage> {
    static mapProps(state: IClientState, props: local.ITextInputUiProps<ILanguage>): local.ITextInputProps {
        const route = state.genre
        const language = controller.getLanguageEdit(state)
        const value = language && language[props.prop]

        return {
            errors: controller.getErrors(route.validation, props.prop, language),
            label: state.mui.language.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputUiProps<ILanguage>,
    ): local.ITextInputActions<ILanguage> {
        return {
            setValue: (prop, value) => dispatch(controller.LanguageActions.setProperty(prop, value)),
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

export const GenreTextInput = connect(
    CGenreTextInput.mapProps,
    CGenreTextInput.mapActions,
)(CGenreTextInput)

export const LanguageTextInput = connect(
    CLanguageTextInput.mapProps,
    CLanguageTextInput.mapActions,
)(CLanguageTextInput)

export const SeriesTextInput = connect(
    CSeriesTextInput.mapProps,
    CSeriesTextInput.mapActions,
)(CSeriesTextInput)

export const RecordingTextInput = connect(
    CRecordingTextInput.mapProps,
    CRecordingTextInput.mapActions,
)(CRecordingTextInput)
