import { observer } from 'mobx-react'
import * as React from 'react'
import * as ui from 'semantic-ui-react'

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
    exportLabel: string
    genreHeader: string
    genreHint: string
    genreOptions: ui.DropdownItemProps[]
    genres: string[]
    language: string
    languageHeader: string
    languageHint: string
    languageOptions: ui.DropdownItemProps[]
    lastPage: number
    list: string[]
    nameHeader: string
    nameSort: TSortOrder
    page: number
    pageSize: number
    rentOptions: ui.DropdownItemProps[]
    rentTo: boolean
    rentToHint: string
    series: string[]
    seriesHint: string
    seriesMap: ISeriesMap
    seriesOptions: ui.DropdownItemProps[]
}

export interface IRecordingRouteActions {
    clearFilter(): void
    export(): void
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

@observer
export class CRecordingRoute extends React.PureComponent<TRecordingRouteProps> {
    render(): JSX.Element {
        return (
            <div className='movie-db-recording-route'>
                <div className='count'>
                    <ui.Segment>{this.props.count}</ui.Segment>
                    <ui.Button onClick={this.props.export}>{this.props.exportLabel}</ui.Button>
                </div>
                <ui.Segment className='filter'>
                    <div className='search'>
                        <RecordingSearch fluid />
                        <ui.Button onClick={this.props.clearFilter}>{this.props.clear}</ui.Button>
                    </div>
                    <ui.Dropdown
                        clearable
                        fluid
                        scrolling
                        search
                        selection
                        options={this.props.languageOptions}
                        placeholder={this.props.languageHint}
                        value={this.props.language || ''}
                        onChange={this.setLanguage}
                    />
                    <ui.Dropdown
                        clearable
                        fluid
                        multiple
                        scrolling
                        search
                        selection
                        options={this.props.genreOptions}
                        placeholder={this.props.genreHint}
                        value={this.props.genres}
                        onChange={this.setGenre}
                    />
                    <ui.Dropdown
                        clearable
                        fluid
                        scrolling
                        search
                        selection
                        options={this.props.seriesOptions}
                        placeholder={this.props.seriesHint}
                        value={this.props.series[0] || ''}
                        onChange={this.setSeries}
                    />
                    <ui.Dropdown
                        clearable
                        fluid
                        scrolling
                        selection
                        options={this.props.rentOptions}
                        placeholder={this.props.rentToHint}
                        value={this.props.rentTo ? '1' : this.props.rentTo === false ? '0' : ''}
                        onChange={this.setRentTo}
                    />
                </ui.Segment>
                <div className='pager'>
                    <ui.Menu className='page-size'>
                        {pageSizes.map((p) => (
                            <PageSizeSelector key={p} size={p} />
                        ))}
                    </ui.Menu>
                    <ui.Pagination
                        activePage={this.props.page}
                        totalPages={this.props.lastPage}
                        onPageChange={this.onPage}
                    />
                </div>
                <div className='table'>
                    <ui.Table celled collapsing compact fixed sortable striped unstackable>
                        <ui.Table.Header>
                            <ui.Table.Row>
                                <ui.Table.HeaderCell
                                    className='name'
                                    sorted={this.props.nameSort}
                                    onClick={this.sortName}
                                >
                                    {this.props.nameHeader}
                                </ui.Table.HeaderCell>
                                <ui.Table.HeaderCell
                                    className='created'
                                    sorted={this.props.createdSort}
                                    onClick={this.sortCreated}
                                >
                                    {this.props.createdHeader}
                                </ui.Table.HeaderCell>
                                <ui.Table.HeaderCell className='languages'>
                                    {this.props.languageHeader}
                                </ui.Table.HeaderCell>
                                <ui.Table.HeaderCell className='genres'>{this.props.genreHeader}</ui.Table.HeaderCell>
                            </ui.Table.Row>
                        </ui.Table.Header>
                        <ui.Table.Body>
                            {this.props.list.map((r) => (
                                <RecordingItem key={r} id={r} />
                            ))}
                        </ui.Table.Body>
                    </ui.Table>
                </div>
            </div>
        )
    }

    private readonly sortName = (): void => this.props.toggleSort('fullName')

    private readonly sortCreated = (): void => this.props.toggleSort('created')

    private readonly onPage = (ev: React.MouseEvent<HTMLAnchorElement>, data: ui.PaginationProps): void =>
        this.props.setPage(typeof data.activePage === 'number' ? data.activePage : 1)

    private readonly setLanguage = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void =>
        this.props.setLanguage(typeof data.value === 'string' ? data.value : undefined)

    private readonly setRentTo = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void =>
        this.props.setRent(data.value === '1' || (data.value !== '0' && undefined))

    private readonly setGenre = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void =>
        this.props.setGenres(Array.isArray(data.value) ? (data.value as string[]) : undefined)

    private readonly setSeries = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void => {
        const series = typeof data.value === 'string' && this.props.seriesMap[data.value]

        this.props.setSeries((series && series.children) || [])
    }

    componentWillMount(): void {
        this.props.query()
    }
}
