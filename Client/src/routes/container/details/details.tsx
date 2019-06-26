import * as React from 'react'
import { Dropdown, DropdownProps, Form, Input, Message } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'
import { IIconSelectOption } from 'movie-db-client'

import { ContainerTextInput } from '../../../components/textInput/textInputRedux'

export interface IContainerDetailsUiProps {
    id: string
}

export interface IContainerDetailsProps {
    hasError: boolean
    idLabel: string
    lost: boolean
    parent: string
    parentLabel: string
    type: containerType
    typeError: string
    typeLabel: string
    typeOptions: IIconSelectOption<containerType>[]
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

        const { typeError } = this.props

        return (
            <Form className='movie-db-container-details' error={this.props.hasError}>
                <Form.Field>
                    <label>{this.props.idLabel}</label>
                    <Input input='text' value={this.props.id || ''} readOnly disabled />
                </Form.Field>
                <Form.Field>
                    <label>{this.props.parentLabel}</label>
                    <Input input='text' value={this.props.parent || ''} readOnly disabled />
                </Form.Field>
                <ContainerTextInput prop='name' required />
                <Form.Field>
                    <label>{this.props.typeLabel}</label>
                    <Dropdown
                        onChange={this.setType}
                        options={this.props.typeOptions}
                        selection
                        value={this.props.type}
                    />
                    {typeError && <Message error>{typeError}</Message>}
                </Form.Field>
                <ContainerTextInput prop='description' textarea />
                <ContainerTextInput prop='parentLocation' />
            </Form>
        )
    }

    private readonly setType = (ev: React.SyntheticEvent<HTMLElement>, props: DropdownProps): void => {
        this.props.setProp('type', props.value as number)
    }

    componentWillMount(): void {
        this.props.loadDetails(this.props.id)
    }

    componentWillReceiveProps(props: Readonly<TContainerDetailsProps>, context: any): void {
        if (props.id !== this.props.id) {
            this.props.loadDetails(props.id)
        }
    }
}
