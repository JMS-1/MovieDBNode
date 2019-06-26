import * as React from 'react'
import { Form, Input, Message, TextArea } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'

export interface IContainerDetailsUiProps {
    id: string
}

export interface IContainerDetailsProps {
    description: string
    descriptionError: string
    location: string
    locationError: string
    lost: boolean
    name: string
    nameError: string
    parent: string
    type: containerType
}

export interface IContainerDetailsActions {
    loadDetails(id: string): void
    setProp<TProp extends keyof IContainer>(prop: TProp, value: IContainer[TProp]): void
}

export type TContainerDetailsProps = IContainerDetailsProps & IContainerDetailsUiProps & IContainerDetailsActions

export class CContainerDetails extends React.PureComponent<TContainerDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        const { locationError, descriptionError, nameError } = this.props
        const inError = locationError || descriptionError || nameError

        return (
            <Form className='movie-db-container-details' error={!!inError}>
                <Form.Field>
                    <label>[TBD]</label>
                    <Input input='text' value={this.props.id || ''} readOnly disabled />
                </Form.Field>
                <Form.Field>
                    <label>[TBD]</label>
                    <Input input='text' value={this.props.parent || ''} readOnly disabled />
                </Form.Field>
                <Form.Field error={!!nameError} required>
                    <label>[TBD]</label>
                    <Input input='text' onChange={this.setName} value={this.props.name || ''} />
                </Form.Field>
                {nameError && <Message error content={nameError} />}
                <Form.Field error={!!descriptionError}>
                    <label>[TBD]</label>
                    <TextArea input='text' onChange={this.setDescription} value={this.props.description || ''} />
                </Form.Field>
                {descriptionError && <Message error content={descriptionError} />}
                <Form.Field error={!!locationError}>
                    <label>[TBD]</label>
                    <Input input='text' onChange={this.setLocation} value={this.props.location || ''} />
                </Form.Field>
                {locationError && <Message error content={locationError} />}
            </Form>
        )
    }

    private readonly setName = (ev: React.ChangeEvent<HTMLInputElement>): void =>
        this.props.setProp('name', ev.currentTarget.value)

    private readonly setDescription = (ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
        this.props.setProp('description', ev.currentTarget.value)

    private readonly setLocation = (ev: React.ChangeEvent<HTMLInputElement>): void =>
        this.props.setProp('parentLocation', ev.currentTarget.value)

    componentWillMount(): void {
        this.props.loadDetails(this.props.id)
    }

    componentWillReceiveProps(props: Readonly<TContainerDetailsProps>, context: any): void {
        if (props.id !== this.props.id) {
            this.props.loadDetails(props.id)
        }
    }
}
