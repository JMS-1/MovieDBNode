import * as React from 'react'
import { Button, Dropdown, DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'

import { ConfirmDeleteContainer } from '../../../components/confirm/confirmRedux'
import { ReportError } from '../../../components/message/messageRedux'
import { ContainerTextInput } from '../../../components/textInput/textInputRedux'

export interface IContainerDetailsUiProps {
    id: string
}

export interface IContainerDetailsProps {
    cancelLabel: string
    containerHint: string
    containerOptions: DropdownItemProps[]
    deleteLabel: string
    hasChanges: boolean
    hasError: boolean
    lost: boolean
    parent: string
    parentLabel: string
    saveLabel: string
    showDelete: boolean
    type: containerType
    typeErrors: string[]
    typeLabel: string
    typeOptions: DropdownItemProps[]
}

export interface IContainerDetailsActions {
    cancel(): void
    confirmDelete(): void
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
            <div className='movie-db-container-details'>
                <ConfirmDeleteContainer />
                <Button.Group>
                    <Button onClick={this.props.cancel} disabled={!hasChanges}>
                        {this.props.cancelLabel}
                    </Button>
                    <Button onClick={this.props.save} disabled={hasError || !hasChanges}>
                        {this.props.saveLabel}
                    </Button>
                    {this.props.showDelete && (
                        <Button onClick={this.props.confirmDelete}>{this.props.deleteLabel}</Button>
                    )}
                </Button.Group>
                <Form error={hasError}>
                    <Form.Field>
                        <label>{this.props.parentLabel}</label>
                        <Dropdown
                            clearable
                            fluid
                            onChange={this.setContainer}
                            options={this.props.containerOptions}
                            placeholder={this.props.containerHint}
                            search
                            selection
                            scrolling
                            value={this.props.parent || ''}
                        />
                    </Form.Field>
                    <ContainerTextInput prop='name' required />
                    <Form.Field required>
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
                </Form>
            </div>
        )
    }

    private readonly setType = (ev: React.SyntheticEvent<HTMLElement>, props: DropdownProps): void => {
        this.props.setProp('type', props.value as number)
    }

    private readonly setContainer = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        this.props.setProp('parentId', (typeof data.value === 'string' ? data.value : '') || undefined)
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
