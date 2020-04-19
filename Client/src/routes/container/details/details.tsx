import * as React from 'react'
import { Dropdown, DropdownItemProps, DropdownProps, Form } from 'semantic-ui-react'

import { containerType, IContainer } from 'movie-db-api'

import { ConfirmDeleteContainer } from '../../../components/confirm/confirmRedux'
import { ContainerDetailActions } from '../../../components/detailActions/actionsRedux'
import { ReportError } from '../../../components/message/messageRedux'
import { ContainerTextInput } from '../../../components/textInput/textInputRedux'
import { ContainerContent } from '../content/contentRedux'

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
                            scrolling
                            search
                            selection
                            options={this.props.containerOptions}
                            placeholder={this.props.containerHint}
                            value={this.props.parent || ''}
                            onChange={this.setContainer}
                        />
                    </Form.Field>
                    <ContainerTextInput required prop='name' />
                    <Form.Field required>
                        <label>{this.props.typeLabel}</label>
                        <Dropdown
                            selection
                            options={this.props.typeOptions}
                            value={this.props.type}
                            onChange={this.setType}
                        />
                        <ReportError errors={this.props.typeErrors} />
                    </Form.Field>
                    <ContainerTextInput textarea prop='description' />
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

    UNSAFE_componentWillMount(): void {
        this.props.loadDetails(this.props.id)
    }

    UNSAFE_componentWillReceiveProps(props: Readonly<TContainerDetailsProps>): void {
        if (props.id !== this.props.id) {
            this.props.loadDetails(props.id)
        }
    }
}
