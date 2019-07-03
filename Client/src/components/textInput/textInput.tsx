import * as React from 'react'
import { Form, Input, TextArea } from 'semantic-ui-react'

import { ReportError } from '../message/messageRedux'

export interface ITextInputUiProps<TItem> {
    prop: keyof TItem
    required?: boolean
    textarea?: boolean
}

export interface ITextInputProps {
    errors: string[]
    label: string
    value: string
}

export interface ITextInputActions<TItem> {
    setValue(prop: keyof TItem, value: string): void
}

export type TTextInputProps<TItem> = ITextInputProps & ITextInputUiProps<TItem> & ITextInputActions<TItem>

export class CTextInput<TItem> extends React.PureComponent<TTextInputProps<TItem>> {
    render(): JSX.Element {
        const { errors } = this.props

        return (
            <Form.Field
                className='movie-db-input-text'
                error={errors && errors.length > 0}
                required={this.props.required}>
                <label>{this.props.label}</label>
                {this.props.textarea ? (
                    <TextArea onChange={this.setValue} value={this.props.value || ''} rows={6} />
                ) : (
                    <Input input='text' onChange={this.setValue} value={this.props.value || ''} />
                )}
                <ReportError errors={errors} />
            </Form.Field>
        )
    }

    private readonly setValue = (
        ev: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>,
    ): void => this.props.setValue(this.props.prop, ev.currentTarget.value)
}
