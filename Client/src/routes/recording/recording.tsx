import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Pagination, PaginationProps, Table } from 'semantic-ui-react'

import { RecordingItem } from './item/itemRedux'

export interface IRecordingRouteParams {
    id?: string
}

export interface IRecordingRouteUiProps extends RouteComponentProps<IRecordingRouteParams> {}

export interface IRecordingRouteProps {
    created: string
    genres: string
    languages: string
    lastPage: number
    list: string[]
    name: string
    page: number
}

export interface IRecordingRouteActions {
    setPage(page: number): void
}

export type TRecordingRouteProps = IRecordingRouteProps & IRecordingRouteUiProps & IRecordingRouteActions

export class CRecordingRoute extends React.PureComponent<TRecordingRouteProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-recording-route'>
                <Table>
                    <Table.Header>
                        <Table.HeaderCell>{this.props.name}</Table.HeaderCell>
                        <Table.HeaderCell>{this.props.created}</Table.HeaderCell>
                        <Table.HeaderCell>{this.props.languages}</Table.HeaderCell>
                        <Table.HeaderCell>{this.props.genres}</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {this.props.list.map(r => (
                            <RecordingItem key={r} id={r} />
                        ))}
                    </Table.Body>
                </Table>
                <Pagination activePage={this.props.page} totalPages={this.props.lastPage} onPageChange={this.onPage} />
            </div>
        )
    }

    private readonly onPage = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps): void =>
        this.props.setPage(data.activePage as number)
}
