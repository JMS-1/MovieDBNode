import * as React from 'react'
import { Button, Dropdown, DropdownProps, Form, Input } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'
import { IIconSelectOption } from 'movie-db-client'

import { ReportError } from '../../../components/message/messageRedux'
import { ContainerTextInput } from '../../../components/textInput/textInputRedux'

export interface IContainerDetailsUiProps {
    id: string
}

export interface IContainerDetailsProps {
    cancelLabel: string
    hasChanges: boolean
    hasError: boolean
    idLabel: string
    lost: boolean
    parent: string
    parentLabel: string
    saveLabel: string
    type: containerType
    typeErrors: string[]
    typeLabel: string
    typeOptions: IIconSelectOption<containerType>[]
}

export interface IContainerDetailsActions {
    cancel(): void
    loadDetails(id: string): void
    save(): void
    setProp<TProp extends keyof IContainer>(prop: TProp, value: IContainer[TProp]): void
}

export type TContainerDetailsProps = IContainerDetailsProps & IContainerDetailsUiProps & IContainerDetailsActions

export class CContainerDetails extends React.PureComponent<TContainerDetailsProps> {
    render(): JSX.Element {
        if (this.props.lost) {
            return null
        }

        const { hasChanges, hasError } = this.props

        return (
            <Form className='movie-db-container-details' error={hasError}>
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
                    <ReportError errors={this.props.typeErrors} />
                </Form.Field>
                <ContainerTextInput prop='description' textarea />
                <ContainerTextInput prop='parentLocation' />
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.save} disabled={hasError || !hasChanges}>
                        {this.props.saveLabel}
                    </Button>
                </Button.Group>
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
