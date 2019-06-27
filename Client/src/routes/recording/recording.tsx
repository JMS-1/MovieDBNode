import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import * as semanticUiReact from 'semantic-ui-react'

import { TRecordingSort, TSortOrder } from 'movie-db-api'
import { ISelectOption } from 'movie-db-client'

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
    language: string
    languageOptions: ISelectOption[]
    languages: string
    lastPage: number
    list: string[]
    name: string
    nameSort: TSortOrder
    page: number
}

export interface IRecordingRouteActions {
    setLanguage(id: string): void
    setPage(page: number): void
    toggleSort(sort: TRecordingSort): void
}

export type TRecordingRouteProps = IRecordingRouteProps & IRecordingRouteUiProps & IRecordingRouteActions

export class CRecordingRoute extends React.PureComponent<TRecordingRouteProps> {
    render(): JSX.Element {
        const { languageOptions } = this.props

        return (
            <div className='movie-db-recording-route'>
                <semanticUiReact.Segment>
                    <RecordingSearch />
                    <semanticUiReact.Dropdown
                        clearable
                        onChange={this.setLanguage}
                        options={languageOptions}
                        placeholder={languageOptions[0].text}
                        selection
                        scrolling
                        value={this.props.language || ''}
                    />
                </semanticUiReact.Segment>
                <div className='table'>
                    <semanticUiReact.Table unstackable celled striped sortable compact fixed collapsing>
                        <semanticUiReact.Table.Header>
                            <semanticUiReact.Table.Row>
                                <semanticUiReact.Table.HeaderCell
                                    className='name'
                                    onClick={this.sortName}
                                    sorted={this.props.nameSort}
                                >
                                    {this.props.name}
                                </semanticUiReact.Table.HeaderCell>
                                <semanticUiReact.Table.HeaderCell
                                    className='created'
                                    onClick={this.sortCreated}
                                    sorted={this.props.createdSort}
                                >
                                    {this.props.created}
                                </semanticUiReact.Table.HeaderCell>
                                <semanticUiReact.Table.HeaderCell className='languages'>
                                    {this.props.languages}
                                </semanticUiReact.Table.HeaderCell>
                                <semanticUiReact.Table.HeaderCell className='genres'>
                                    {this.props.genres}
                                </semanticUiReact.Table.HeaderCell>
                            </semanticUiReact.Table.Row>
                        </semanticUiReact.Table.Header>
                        <semanticUiReact.Table.Body>
                            {this.props.list.map(r => (
                                <RecordingItem key={r} id={r} />
                            ))}
                        </semanticUiReact.Table.Body>
                    </semanticUiReact.Table>
                </div>
                <semanticUiReact.Pagination
                    activePage={this.props.page}
                    totalPages={this.props.lastPage}
                    onPageChange={this.onPage}
                />
            </div>
        )
    }

    private readonly sortName = (): void => this.props.toggleSort('fullName')

    private readonly sortCreated = (): void => this.props.toggleSort('created')

    private readonly onPage = (ev: React.MouseEvent<HTMLAnchorElement>, data: semanticUiReact.PaginationProps): void =>
        this.props.setPage(data.activePage as number)

    private readonly setLanguage = (ev: React.SyntheticEvent<HTMLElement>, data: semanticUiReact.DropdownProps): void =>
        this.props.setLanguage(data.value as string)
}
