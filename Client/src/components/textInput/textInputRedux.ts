import { ValidationError } from 'fastest-validator'
import { observer } from 'mobx-react'
import { IClientState } from 'movie-db-client'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IContainer, IGenre, IRecording, ISeries } from 'movie-db-api'

import * as local from './textInput'

import { ILanguage } from '../../../../Server/src/model'
import * as controller from '../../controller'
import { languages, translations } from '../../stores'

class CContainerTextInput extends local.CTextInputLegacy<IContainer> {
    static mapProps(
        state: IClientState,
        props: local.ITextInputLegacyUiProps<IContainer>
    ): local.ITextInputLegacyProps {
        const route = state.container
        const edit = controller.getContainerEdit(state)
        const value = edit && edit[props.prop]

        return {
            errors: controller.getErrors(route.validation, new RegExp(`^${props.prop}$`)),
            label: state.mui.container.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputLegacyUiProps<IContainer>
    ): local.ITextInputLegacyActions<IContainer> {
        return {
            setValue: (prop, value) => dispatch(controller.ContainerActions.setProperty(prop, value)),
        }
    }
}

class CGenreTextInput extends local.CTextInputLegacy<IGenre> {
    static mapProps(state: IClientState, props: local.ITextInputLegacyUiProps<IGenre>): local.ITextInputLegacyProps {
        const route = state.genre
        const genre = controller.getGenreEdit(state)
        const value = genre && genre[props.prop]

        return {
            errors: controller.getErrors(route.validation, new RegExp(`^${props.prop}$`)),
            label: state.mui.genre.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputLegacyUiProps<IGenre>
    ): local.ITextInputLegacyActions<IGenre> {
        return {
            setValue: (prop, value) => dispatch(controller.GenreActions.setProperty(prop, value)),
        }
    }
}

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

@observer
export class LanguageTextInput extends local.TextInput<ILanguage> {
    protected getErrors(): ValidationError[] | true {
        return languages.updateErrors
    }

    protected getValue(prop: keyof ILanguage): string {
        return languages.workingCopy[prop]
    }

    protected setValue(prop: keyof ILanguage, value: string): void {
        languages.workingCopy[prop] = value
    }

    protected getLabel(prop: keyof ILanguage): string {
        return translations.strings.language.edit[prop]
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

export const ContainerTextInput = connect(
    CContainerTextInput.mapProps,
    CContainerTextInput.mapActions
)(CContainerTextInput)

export const GenreTextInput = connect(CGenreTextInput.mapProps, CGenreTextInput.mapActions)(CGenreTextInput)

export const SeriesTextInput = connect(CSeriesTextInput.mapProps, CSeriesTextInput.mapActions)(CSeriesTextInput)

export const RecordingTextInput = connect(
    CRecordingTextInput.mapProps,
    CRecordingTextInput.mapActions
)(CRecordingTextInput)
