import * as React from 'react'
import { Dropdown, DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'

import { ContainerContent } from '../content/contentRedux'

import { ConfirmDeleteContainer } from '../../../components/confirm/confirmRedux'
import { ContainerDetailActions } from '../../../components/detailActions/actionsRedux'
import { ReportError } from '../../../components/message/messageRedux'
import { ContainerTextInput } from '../../../components/textInput/textInputRedux'

export interface IContainerDetailsUiProps {
    id: string
}

export interface IContainerDetailsProps {
    containerHint: string
    containerOptions: DropdownItemProps[]
    hasError: boolean
    lost: boolean
    parent: string
    parentLabel: string
    type: containerType
    typeErrors: string[]
    typeLabel: string
    typeOptions: DropdownItemProps[]
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

        return (
            <div className='movie-db-container-details'>
                <ConfirmDeleteContainer />
                <ContainerDetailActions />
                <Form error={this.props.hasError}>
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
                <ContainerContent />
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
