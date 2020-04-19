import * as React from 'react'
import { Table } from 'semantic-ui-react'

import { IRecording } from 'movie-db-api'

import { routes } from '../../../stores/routes'

export interface IContainerContentUiProps {}

export interface IContainerContentProps {
    list: IRecording[]
    name: string
    position: string
}

export interface IContainerContentActions {}

export type TContainerContentProps = IContainerContentProps & IContainerContentUiProps & IContainerContentActions

export class CContainerContent extends React.PureComponent<TContainerContentProps> {
    render(): JSX.Element {
        const { list } = this.props

        if (list.length < 1) {
            return null
        }

        return (
            <Table celled collapsing compact fixed striped unstackable className='movie-db-container-content'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{this.props.name}</Table.HeaderCell>
                        <Table.HeaderCell>{this.props.position}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {list.map((r) => (
                        <Table.Row key={r._id}>
                            <Table.Cell selectable>
                                <a href={`#${routes.recording}/${r._id}`}>{r.fullName}</a>
                            </Table.Cell>
                            <Table.Cell className='position'>{r.containerPosition}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
}
