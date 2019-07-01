import * as React from 'react'
import * as semanticUiReact from 'semantic-ui-react'

import { TRecordingSort, TSortOrder } from 'movie-db-api'

import { RecordingItem } from './item/itemRedux'
import { PageSizeSelector } from './size/sizeRedux'

import { RecordingSearch } from '../../components/search/searchRedux'
import { ISeriesMap } from '../../controller'

export interface IRecordingRouteUiProps {}

export interface IRecordingRouteProps {
    clear: string
    count: string
    createdHeader: string
    createdSort: TSortOrder
    genreHeader: string
    genreHint: string
    genreOptions: semanticUiReact.DropdownItemProps[]
    genres: string[]
    language: string
    languageHeader: string
    languageHint: string
    languageOptions: semanticUiReact.DropdownItemProps[]
    lastPage: number
    list: string[]
    nameHeader: string
    nameSort: TSortOrder
    page: number
    pageSize: number
    rentOptions: semanticUiReact.DropdownItemProps[]
    rentTo: boolean
    rentToHint: string
    series: string[]
    seriesHint: string
    seriesMap: ISeriesMap
    seriesOptions: semanticUiReact.DropdownItemProps[]
}

export interface IRecordingRouteActions {
    clearFilter(): void
    query(): void
    setGenres(ids: string[]): void
    setLanguage(id: string): void
    setPage(page: number): void
    setPageSize(size: number): void
    setRent(rentTo: boolean): void
    setSeries(ids: string[]): void
    toggleSort(sort: TRecordingSort): void
}

export type TRecordingRouteProps = IRecordingRouteProps & IRecordingRouteUiProps & IRecordingRouteActions

const pageSizes = [15, 30, 50, 75, 100, 250]

export class CRecordingRoute extends React.PureComponent<TRecordingRouteProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-recording-route'>
                <semanticUiReact.Segment className='count'>{this.props.count}</semanticUiReact.Segment>
                <semanticUiReact.Segment className='filter'>
                    <div className='search'>
                        <RecordingSearch fluid />
                        <semanticUiReact.Button onClick={this.props.clearFilter}>
                            {this.props.clear}
                        </semanticUiReact.Button>
                    </div>
                    <semanticUiReact.Dropdown
                        clearable
                        fluid
                        onChange={this.setLanguage}
                        options={this.props.languageOptions}
                        placeholder={this.props.languageHint}
                        search
                        selection
                        scrolling
                        value={this.props.language || ''}
                    />
                    <semanticUiReact.Dropdown
                        clearable
                        fluid
                        multiple
                        onChange={this.setGenre}
                        options={this.props.genreOptions}
                        placeholder={this.props.genreHint}
                        search
                        selection
                        scrolling
                        value={this.props.genres}
                    />
                    <semanticUiReact.Dropdown
                        clearable
                        fluid
                        onChange={this.setSeries}
                        options={this.props.seriesOptions}
                        placeholder={this.props.seriesHint}
                        search
                        selection
                        scrolling
                        value={this.props.series[0] || ''}
                    />
                    <semanticUiReact.Dropdown
                        clearable
                        fluid
                        onChange={this.setRentTo}
                        options={this.props.rentOptions}
                        placeholder={this.props.rentToHint}
                        selection
                        scrolling
                        value={this.props.rentTo ? '1' : this.props.rentTo === false ? '0' : ''}
                    />
                </semanticUiReact.Segment>
                <div className='pager'>
                    <semanticUiReact.Menu className='page-size'>
                        {pageSizes.map(p => (
                            <PageSizeSelector key={p} size={p} />
                        ))}
                    </semanticUiReact.Menu>
                    <semanticUiReact.Pagination
                        activePage={this.props.page}
                        totalPages={this.props.lastPage}
                        onPageChange={this.onPage}
                    />
                </div>
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
            </div>
        )
    }

    private readonly sortName = (): void => this.props.toggleSort('fullName')

    private readonly sortCreated = (): void => this.props.toggleSort('created')

    private readonly onPage = (ev: React.MouseEvent<HTMLAnchorElement>, data: semanticUiReact.PaginationProps): void =>
        this.props.setPage(typeof data.activePage === 'number' ? data.activePage : 1)

    private readonly setLanguage = (ev: React.SyntheticEvent<HTMLElement>, data: semanticUiReact.DropdownProps): void =>
        this.props.setLanguage(typeof data.value === 'string' ? data.value : undefined)

    private readonly setRentTo = (ev: React.SyntheticEvent<HTMLElement>, data: semanticUiReact.DropdownProps): void =>
        this.props.setRent(data.value === '1' || (data.value !== '0' && undefined))

    private readonly setGenre = (ev: React.SyntheticEvent<HTMLElement>, data: semanticUiReact.DropdownProps): void =>
        this.props.setGenres(Array.isArray(data.value) ? (data.value as string[]) : undefined)

    private readonly setSeries = (ev: React.SyntheticEvent<HTMLElement>, data: semanticUiReact.DropdownProps): void => {
        const series = typeof data.value === 'string' && this.props.seriesMap[data.value]

        this.props.setSeries((series && series.children) || [])
    }

    componentWillMount(): void {
        this.props.query()
    }
}
