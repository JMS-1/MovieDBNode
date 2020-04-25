import { action } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import * as ui from 'semantic-ui-react'

import { RecordingItem } from './item/item'
import { PageSizeSelector } from './size/size'

import { Search } from '../../components/search/search'
import { translations, recordings, languages, genres, series } from '../../stores'

export interface IRecordingRouteUiProps {}

const pageSizes = [15, 30, 50, 75, 100, 250]

@observer
export class RecordingRoute extends React.PureComponent<IRecordingRouteUiProps> {
    render(): JSX.Element {
        const mui = translations.strings.recording

        const queryCount = recordings.queryResult.count
        const queryTotal = recordings.queryResult.total

        const count = mui.count.replace(/\{count\}/g, `${queryCount}`).replace(/\{total\}/g, `${queryTotal}`)
        const lastPage = Math.ceil(queryCount / recordings.queryFilter.pageSize)

        return (
            <div className='movie-db-recording-route'>
                <div className='count'>
                    <ui.Segment>{count}</ui.Segment>
                    <ui.Button onClick={this.onExport}>{mui.export}</ui.Button>
                </div>
                <ui.Segment className='filter'>
                    <div className='search'>
                        <Search fluid store={this} />
                        <ui.Button onClick={this.onClearFilter}>{mui.clear}</ui.Button>
                    </div>
                    <ui.Dropdown
                        clearable
                        fluid
                        scrolling
                        search
                        selection
                        options={languages.asOptions}
                        placeholder={translations.strings.language.noSelect}
                        value={recordings.queryFilter.language || ''}
                        onChange={this.setLanguage}
                    />
                    <ui.Dropdown
                        clearable
                        fluid
                        multiple
                        scrolling
                        search
                        selection
                        options={genres.asOptions}
                        placeholder={translations.strings.genre.noSelect}
                        value={recordings.queryFilter.genres}
                        onChange={this.setGenre}
                    />
                    <ui.Dropdown
                        clearable
                        fluid
                        scrolling
                        search
                        selection
                        options={series.asOptions}
                        placeholder={translations.strings.series.noSelect}
                        value={(recordings.queryFilter.series.length > 0 && recordings.queryFilter.series[0]) || ''}
                        onChange={this.setSeries}
                    />
                    <ui.Dropdown
                        clearable
                        fluid
                        scrolling
                        selection
                        options={recordings.rentAsOptions}
                        placeholder={mui.anyRent}
                        value={recordings.queryFilter.rent ? '1' : recordings.queryFilter.rent === false ? '0' : ''}
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
                        activePage={recordings.queryFilter.firstPage}
                        totalPages={lastPage}
                        onPageChange={this.onPage}
                    />
                </div>
                <div className='table'>
                    <ui.Table celled collapsing compact fixed sortable striped unstackable>
                        <ui.Table.Header>
                            <ui.Table.Row>
                                <ui.Table.HeaderCell
                                    className='name'
                                    sorted={
                                        recordings.queryFilter.sort === 'fullName'
                                            ? recordings.queryFilter.sortOrder === 'Ascending'
                                                ? 'ascending'
                                                : 'descending'
                                            : undefined
                                    }
                                    onClick={this.sortName}
                                >
                                    {mui.name}
                                </ui.Table.HeaderCell>
                                <ui.Table.HeaderCell
                                    className='created'
                                    sorted={
                                        recordings.queryFilter.sort === 'created'
                                            ? recordings.queryFilter.sortOrder === 'Ascending'
                                                ? 'ascending'
                                                : 'descending'
                                            : undefined
                                    }
                                    onClick={this.sortCreated}
                                >
                                    {mui.created}
                                </ui.Table.HeaderCell>
                                <ui.Table.HeaderCell className='languages'>{mui.languages}</ui.Table.HeaderCell>
                                <ui.Table.HeaderCell className='genres'>{mui.genres}</ui.Table.HeaderCell>
                            </ui.Table.Row>
                        </ui.Table.Header>
                        <ui.Table.Body>
                            {recordings.queryResult.view.map((r) => (
                                <RecordingItem key={r._id} recording={r} />
                            ))}
                        </ui.Table.Body>
                    </ui.Table>
                </div>
            </div>
        )
    }

    @action
    private changeFilterProp(field: 'created' | 'fullName'): void {
        if (recordings.queryFilter.sort === field) {
            recordings.setFilterProp(
                'sortOrder',
                recordings.queryFilter.sortOrder === 'Descending' ? 'Ascending' : 'Descending'
            )
        } else {
            recordings.setFilterProp('sort', field)
            recordings.setFilterProp('sortOrder', field === 'fullName' ? 'Ascending' : 'Descending')
        }
    }

    private readonly sortName = (): void => this.changeFilterProp('fullName')

    private readonly sortCreated = (): void => this.changeFilterProp('created')

    private readonly onPage = (ev: React.MouseEvent<HTMLAnchorElement>, data: ui.PaginationProps): void =>
        recordings.setFilterProp('firstPage', typeof data.activePage === 'number' ? data.activePage : 1)

    private readonly setLanguage = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void =>
        recordings.setFilterProp('language', typeof data.value === 'string' ? data.value : undefined)

    private readonly setRentTo = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void =>
        recordings.setFilterProp('rent', data.value === '1' || (data.value !== '0' && undefined))

    private readonly setGenre = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void =>
        recordings.setFilterProp('genres', Array.isArray(data.value) ? (data.value as string[]) : undefined)

    private readonly setSeries = (ev: React.SyntheticEvent<HTMLElement>, data: ui.DropdownProps): void =>
        recordings.setFilterProp('series', series.getChildTree(data.value as string))

    private readonly onClearFilter = (): void => recordings.reset()

    private readonly onExport = (): void => {
        /*
        private startExport(state: local.IRecordingState, request: local.IStartRecordingExport): local.IRecordingState {
            const req: api.IRecordingQueryRequest = {
                correlationId: uuid(),
                firstPage: 0,
                fullName: state.search,
                genres: state.genres,
                language: state.language,
                pageSize: Number.MAX_SAFE_INTEGER,
                rent: state.rent,
                series: state.series,
                sort: 'fullName',
                sortOrder: 'ascending',
            }

            ServerApi.post('recording/export/query', req, RecordingActions.exportDone)

            return state
        }

        private exportDone(state: local.IRecordingState, request: local.IRecordingExportDone): local.IRecordingState {
            window.open('api/recording/export', '_blank')

            return state
        }        
        */
    }

    UNSAFE_componentWillMount(): void {
        recordings.query()
    }

    get filter(): string {
        return recordings.queryFilter.fullName
    }

    set filter(filter: string) {
        recordings.setFilterProp('fullName', filter)
    }
}
