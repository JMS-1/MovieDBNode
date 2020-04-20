import { observer } from 'mobx-react'
import * as React from 'react'
import { Dropdown, DropdownProps, Form } from 'semantic-ui-react'

import { IContainer } from '../../../../../Server/src/model'
import { DeleteConfirm } from '../../../components/confirm/confirm'
import { DetailActions } from '../../../components/detailActions/actions'
import { ReportError } from '../../../components/message/messageRedux'
import { TextInput } from '../../../components/textInput/textInput'
import { containers, translations } from '../../../stores'
//import { ContainerContent } from '../content/contentRedux'

export interface IContainerDetailsUiProps {
    id: string
}

@observer
export class ContainerDetails extends React.PureComponent<IContainerDetailsUiProps> {
    render(): JSX.Element {
        if (!containers.selected && this.props.id !== 'NEW') {
            return null
        }

        const { workingCopy } = containers

        const mui = translations.strings.container
        const emui = mui.edit

        return (
            <div className='movie-db-container-details'>
                <DeleteConfirm scope='container' store={containers} />
                <DetailActions<IContainer> store={containers} />
                <Form error={containers.errors !== true}>
                    <Form.Field>
                        <label>{emui.parentId}</label>
                        <Dropdown
                            clearable
                            fluid
                            scrolling
                            search
                            selection
                            options={containers.possibleParents}
                            placeholder={mui.noParent}
                            value={workingCopy.parentId || ''}
                            onChange={this.setContainer}
                        />
                    </Form.Field>
                    <TextInput<IContainer> required prop='name' scope='container' store={containers} />
                    <Form.Field required>
                        <label>{emui.type}</label>
                        <Dropdown
                            selection
                            options={containers.typesAsOptions}
                            value={workingCopy.type || ''}
                            onChange={this.setType}
                        />
                        <ReportError errors={containers.getErrors('type')} />
                    </Form.Field>
                    <TextInput<IContainer> textarea prop='description' scope='container' store={containers} />
                    <TextInput<IContainer> prop='parentLocation' scope='container' store={containers} />
                </Form>
                {/* <ContainerContent /> */}
            </div>
        )
    }

    private readonly setType = (ev: React.SyntheticEvent<HTMLElement>, props: DropdownProps): void => {
        containers.workingCopy.type = props.value as number
    }

    private readonly setContainer = (ev: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
        containers.workingCopy.parentId = (typeof data.value === 'string' ? data.value : '') || undefined
    }

    UNSAFE_componentWillMount(): void {
        containers.select(this.props.id)
    }

    UNSAFE_componentWillReceiveProps(props: Readonly<IContainerDetailsUiProps>): void {
        if (props.id !== this.props.id) {
            containers.select(props.id)
        }
    }
}
