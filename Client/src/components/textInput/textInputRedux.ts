import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import { IContainer } from 'movie-db-api'
import { IClientState } from 'movie-db-client'

import * as local from './textInput'

import { ContainerActions, getContainerEdit, getErrors } from '../../controller'

class CContainerTextInput extends local.CTextInput<IContainer> {
    static mapProps(state: IClientState, props: local.ITextInputUiProps<IContainer>): local.ITextInputProps {
        const route = state.container
        const edit = getContainerEdit(state)
        const value = edit && edit[props.prop]

        return {
            errors: getErrors(route.validation, props.prop, edit),
            label: state.mui.container.edit[props.prop],
            value: typeof value === 'string' ? value : undefined,
        }
    }

    static mapActions(
        dispatch: Dispatch<Action>,
        props: local.ITextInputUiProps<IContainer>
    ): local.ITextInputActions<IContainer> {
        return {
            setValue: (prop, value) => dispatch(ContainerActions.setProperty(prop, value)),
        }
    }
}

export const ContainerTextInput = connect(
    CContainerTextInput.mapProps,
    CContainerTextInput.mapActions
)(CContainerTextInput)
