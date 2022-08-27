import { ValidationError } from 'fastest-validator'
import { computed, makeObservable } from 'mobx'
// eslint-disable-next-line unused-imports/no-unused-imports-ts
import { observer } from 'mobx-react'
import { IViewModel } from 'mobx-utils'
import * as React from 'react'
import { Form, Input, InputOnChangeData, TextArea, TextAreaProps } from 'semantic-ui-react'

import { translations } from '../../stores'
import { ReportError } from '../message/message'

interface ITextInputStore<TItem> {
    getErrors(field: string): string[] | null
    readonly errors: true | ValidationError[]
    readonly workingCopy: TItem & IViewModel<TItem>
}

interface ITextInputProps<TItem> {
    prop: keyof TItem
    required?: boolean
    scope: 'language' | 'genre' | 'container' | 'series' | 'recording'
    store: ITextInputStore<TItem>
    textarea?: boolean
}

@observer
export class TextInput<TItem> extends React.PureComponent<ITextInputProps<TItem>> {
    constructor(props: Readonly<ITextInputProps<TItem>>) {
        super(props)

        makeObservable(this, { errors: computed })
    }

    render(): JSX.Element {
        const { prop, scope } = this.props

        const errors = this.errors

        const emui = translations.strings[scope].edit

        return (
            <Form.Field
                className='movie-db-input-text'
                error={errors && errors.length > 0}
                required={this.props.required}
            >
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

    get errors(): string[] | null {
        return this.props.store.getErrors(this.props.prop as string)
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
