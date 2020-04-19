import { ValidationError } from 'fastest-validator'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { IViewModel } from 'mobx-utils'
import * as React from 'react'
import { Form, Input, TextArea, InputOnChangeData, TextAreaProps } from 'semantic-ui-react'

import { translations } from '../../stores'
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

interface ITextInputStore<TItem> {
    readonly errors: true | ValidationError[]
    readonly workingCopy: TItem & IViewModel<TItem>
}

interface ITextInputProps<TItem> {
    prop: keyof TItem
    required?: boolean
    scope: 'language'
    store: ITextInputStore<TItem>
    textarea?: boolean
}

@observer
export class TextInput<TItem> extends React.PureComponent<ITextInputProps<TItem>> {
    render(): JSX.Element {
        const { prop, scope } = this.props

        const errors = this.errors

        const emui = translations.strings[scope].edit

        return (
            <Form.Field className='movie-db-input-text' error={errors.length > 0} required={this.props.required}>
                <label>{emui[prop as keyof typeof emui]}</label>
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
        const { prop, store } = this.props

        const errors = store.errors

        return errors === true ? [] : errors.filter((e) => e.field === prop).map((e) => e.message)
    }

    private get value(): string {
        const value = this.props.store.workingCopy[this.props.prop]

        return typeof value === 'string' ? value : ''
    }

    private readonly onChange = (
        _ev: React.ChangeEvent | React.FormEvent,
        data: InputOnChangeData | TextAreaProps
    ): void => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.props.store.workingCopy[this.props.prop] = data.value as any
    }
}
