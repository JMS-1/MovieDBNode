import { ValidationError } from 'fastest-validator'
import { computed } from 'mobx'
import * as React from 'react'
import { Form, Input, TextArea, InputOnChangeData, TextAreaProps } from 'semantic-ui-react'

import { ReportError } from '../message/messageRedux'

export interface ITextInputLegacyUiProps<TItem> {
    prop: keyof TItem
    required?: boolean
    textarea?: boolean
}

export interface ITextInputLegacyProps {
    errors: string[]
    label: string
    value: string
}

export interface ITextInputLegacyActions<TItem> {
    setValue(prop: keyof TItem, value: string): void
}

export type TTextInputLegacyProps<TItem> = ITextInputLegacyProps &
    ITextInputLegacyUiProps<TItem> &
    ITextInputLegacyActions<TItem>

export class CTextInputLegacy<TItem> extends React.PureComponent<TTextInputLegacyProps<TItem>> {
    render(): JSX.Element {
        const { errors } = this.props

        return (
            <Form.Field
                className='movie-db-input-text'
                error={errors && errors.length > 0}
                required={this.props.required}
            >
                <label>{this.props.label}</label>
                {this.props.textarea ? (
                    <TextArea rows={6} value={this.props.value || ''} onChange={this.setValue} />
                ) : (
                    <Input input='text' value={this.props.value || ''} onChange={this.setValue} />
                )}
                <ReportError errors={errors} />
            </Form.Field>
        )
    }

    private readonly setValue = (
        ev: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>
    ): void => this.props.setValue(this.props.prop, ev.currentTarget.value)
}

export interface ITextInputProps<TItem> {
    prop: keyof TItem
    required?: boolean
    textarea?: boolean
}

export abstract class TextInput<TItem> extends React.PureComponent<ITextInputProps<TItem>> {
    render(): JSX.Element {
        const errors = this.errors

        return (
            <Form.Field className='movie-db-input-text' error={errors.length > 0} required={this.props.required}>
                <label>{this.getLabel(this.props.prop)}</label>
                {this.props.textarea ? (
                    <TextArea rows={6} value={this.value} onChange={this.onChange} />
                ) : (
                    <Input input='text' value={this.value} onChange={this.onChange} />
                )}
                <ReportError errors={errors} />
            </Form.Field>
        )
    }

    @computed
    private get errors(): string[] {
        const { prop } = this.props

        const errors = this.getErrors()

        return errors === true ? [] : errors.filter((e) => e.field === prop).map((e) => e.message)
    }

    private get value(): string {
        const value = this.getValue(this.props.prop)

        return typeof value === 'string' ? value : ''
    }

    protected abstract getErrors(): ValidationError[] | true

    protected abstract getValue(prop: keyof TItem): string

    protected abstract setValue(prop: keyof TItem, value: string): void

    protected abstract getLabel(prop: keyof TItem): string

    private readonly onChange = (
        _ev: React.ChangeEvent | React.FormEvent,
        data: InputOnChangeData | TextAreaProps
    ): void => this.setValue(this.props.prop, data.value as string)
}
