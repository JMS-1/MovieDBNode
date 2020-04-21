import { observer } from 'mobx-react'
import * as React from 'react'
import { Table } from 'semantic-ui-react'

import { translations, containers } from '../../../stores'
import { routes } from '../../../stores/routes'

export interface IContainerContentUiProps {}

@observer
export class ContainerContent extends React.PureComponent<IContainerContentUiProps> {
    render(): JSX.Element {
        const { recordings } = containers

        if (recordings.length < 1) {
            return null
        }

        const mui = translations.strings.container

        return (
            <div className='movie-db-container-content'>
                <Table celled collapsing compact fixed striped unstackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{mui.name}</Table.HeaderCell>
                            <Table.HeaderCell>{mui.position}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {recordings.map((r) => (
                            <Table.Row key={r._id}>
                                <Table.Cell selectable>
                                    <a href={`#${routes.recording}/${r._id}`}>{r.fullName}</a>
                                </Table.Cell>
                                <Table.Cell className='position'>{r.containerPosition}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}
