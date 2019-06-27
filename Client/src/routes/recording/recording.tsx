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
    createdHeader: string
    createdSort: TSortOrder
    genres: string[]
    genreHint: string
    genreOptions: ISelectOption[]
    genreHeader: string
    language: string
    languageHint: string
    languageOptions: ISelectOption[]
    languageHeader: string
    lastPage: number
    list: string[]
    nameHeader: string
    nameSort: TSortOrder
    page: number
}

export interface IRecordingRouteActions {
    setGenres(ids: string[]): void
    setLanguage(id: string): void
    setPage(page: number): void
    toggleSort(sort: TRecordingSort): void
}

export type TRecordingRouteProps = IRecordingRouteProps & IRecordingRouteUiProps & IRecordingRouteActions

export class CRecordingRoute extends React.PureComponent<TRecordingRouteProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-recording-route'>
                <semanticUiReact.Segment>
                    <RecordingSearch />
                    <semanticUiReact.Dropdown
                        clearable
                        onChange={this.setLanguage}
                        options={this.props.languageOptions}
                        placeholder={this.props.languageHint}
                        selection
                        scrolling
                        value={this.props.language || ''}
                    />
                    <semanticUiReact.Dropdown
                        clearable
                        multiple
                        onChange={this.setGenre}
                        options={this.props.genreOptions}
                        placeholder={this.props.genreHint}
                        selection
                        scrolling
                        value={this.props.genres}
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
                                    {this.props.nameHeader}
                                </semanticUiReact.Table.HeaderCell>
                                <semanticUiReact.Table.HeaderCell
                                    className='created'
                                    onClick={this.sortCreated}
                                    sorted={this.props.createdSort}
                                >
                                    {this.props.createdHeader}
                                </semanticUiReact.Table.HeaderCell>
                                <semanticUiReact.Table.HeaderCell className='languages'>
                                    {this.props.languageHeader}
                                </semanticUiReact.Table.HeaderCell>
                                <semanticUiReact.Table.HeaderCell className='genres'>
                                    {this.props.genreHeader}
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

    private readonly setGenre = (ev: React.SyntheticEvent<HTMLElement>, data: semanticUiReact.DropdownProps): void =>
        this.props.setGenres(data.value as string[])
}
