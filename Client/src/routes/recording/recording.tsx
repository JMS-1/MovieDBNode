import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Pagination, PaginationProps, Segment, Table } from 'semantic-ui-react'

import { TRecordingSort, TSortOrder } from 'movie-db-api'

import { RecordingItem } from './item/itemRedux'

import { RecordingSearch } from '../../components/search/searchRedux'

export interface IRecordingRouteParams {
    id?: string
}

export interface IRecordingRouteUiProps extends RouteComponentProps<IRecordingRouteParams> {}

export interface IRecordingRouteProps {
    created: string
    createdSort: TSortOrder
    genres: string
    languages: string
    lastPage: number
    list: string[]
    name: string
    nameSort: TSortOrder
    page: number
}

export interface IRecordingRouteActions {
    setPage(page: number): void
    toggleSort(sort: TRecordingSort): void
}

export type TRecordingRouteProps = IRecordingRouteProps & IRecordingRouteUiProps & IRecordingRouteActions

export class CRecordingRoute extends React.PureComponent<TRecordingRouteProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-recording-route'>
                <Segment>
                    <RecordingSearch />
                </Segment>
                <Table unstackable celled striped sortable compact fixed collapsing>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell className='name' onClick={this.sortName} sorted={this.props.nameSort}>
                                {this.props.name}
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                className='created'
                                onClick={this.sortCreated}
                                sorted={this.props.createdSort}
                            >
                                {this.props.created}
                            </Table.HeaderCell>
                            <Table.HeaderCell className='languages'>{this.props.languages}</Table.HeaderCell>
                            <Table.HeaderCell className='genres'>{this.props.genres}</Table.HeaderCell>
                        </Table.Row>
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

    private readonly sortName = (): void => this.props.toggleSort('fullName')

    private readonly sortCreated = (): void => this.props.toggleSort('created')

    private readonly onPage = (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps): void =>
        this.props.setPage(data.activePage as number)
}
