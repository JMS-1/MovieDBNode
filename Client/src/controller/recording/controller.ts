import { v4 as uuid } from 'uuid'

import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

import { RecordingActions } from './actions'

import { EditController } from '../controller'

import { ServerApi } from '../../store'

type TRecordingActions =
    | local.ICancelRecordingEdit
    | local.ILoadRecordings
    | local.ILoadSchemas
    | local.IQueryRecordings
    | local.IRecordingSaved
    | local.IResetRecordingFilter
    | local.ISaveRecording
    | local.ISelectRecording
    | local.ISetRecordingGenreFilter
    | local.ISetRecordingLanguageFilter
    | local.ISetRecordingPage
    | local.ISetRecordingPageSize
    | local.ISetRecordingProperty<any>
    | local.ISetRecordingRentToFilter
    | local.ISetRecordingSeriesFilter
    | local.ISetRecordingTextFilter
    | local.IToggleRecordingSort

const controller = new (class extends EditController<api.IRecording, TRecordingActions, local.IRecordingState> {
    protected readonly schema = 'recording'

    protected getReducerMap(): local.IActionHandlerMap<TRecordingActions, local.IRecordingState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.recordingActions.cancel]: this.cancelEdit,
            [local.recordingActions.query]: this.query,
            [local.recordingActions.queryDone]: this.load,
            [local.recordingActions.resetFilter]: this.resetFilter,
            [local.recordingActions.save]: this.startSave,
            [local.recordingActions.saveDone]: this.saveDone,
            [local.recordingActions.select]: this.select,
            [local.recordingActions.setGenreFilter]: this.setGenreFilter,
            [local.recordingActions.setLanguageFilter]: this.setLanguageFilter,
            [local.recordingActions.setPage]: this.setPage,
            [local.recordingActions.setProp]: this.setProperty,
            [local.recordingActions.setRentFilter]: this.setRentFilter,
            [local.recordingActions.setSeriesFilter]: this.setSeriesFilter,
            [local.recordingActions.setSize]: this.setPageSize,
            [local.recordingActions.setTextFilter]: this.setTextFilter,
            [local.recordingActions.sort]: this.setSort,
        }
    }

    protected getInitialState(): local.IRecordingState {
        return {
            ...super.getInitialState(),
            correlationId: undefined,
            count: 0,
            genreInfo: [],
            genres: [],
            language: '',
            languageInfo: [],
            page: 1,
            pageSize: 15,
            rent: undefined,
            resetAfterLoad: undefined,
            search: '',
            series: [],
            sort: 'fullName',
            sortOrder: 'ascending',
            total: 0,
        }
    }

    private startSave(state: local.IRecordingState, request: local.ISaveRecording): local.IRecordingState {
        if (state.workingCopy) {
            ServerApi.put(`recording/${state.workingCopy._id}`, state.workingCopy, RecordingActions.saveDone)
        }

        return state
    }

    private resetFilter(state: local.IRecordingState, request: local.IResetRecordingFilter): local.IRecordingState {
        return this.sendQuery(
            {
                ...state,
                genres: [],
                language: '',
                pageSize: 15,
                rent: undefined,
                search: '',
                series: [],
                sort: 'fullName',
                sortOrder: 'ascending',
            },
            true,
        )
    }

    private sendQuery(state: local.IRecordingState, reset: boolean = false): local.IRecordingState {
        const req: api.IRecordingQueryRequest = {
            correlationId: uuid(),
            firstPage: reset ? 0 : state.page - 1,
            fullName: state.search,
            genres: state.genres,
            language: state.language,
            pageSize: state.pageSize,
            rent: state.rent,
            series: state.series,
            sort: state.sort,
            sortOrder: state.sortOrder,
        }

        ServerApi.post('recording/search', req, RecordingActions.load)

        return { ...state, correlationId: req.correlationId, resetAfterLoad: reset }
    }

    private query(state: local.IRecordingState, request: local.IQueryRecordings): local.IRecordingState {
        return this.sendQuery(state)
    }

    private setPage(state: local.IRecordingState, request: local.ISetRecordingPage): local.IRecordingState {
        const pages = Math.ceil(state.count / state.pageSize)
        const page = Math.max(1, Math.min(pages, request.page))

        if (page === state.page) {
            return state
        }

        return this.sendQuery({ ...state, page })
    }

    private setPageSize(state: local.IRecordingState, request: local.ISetRecordingPageSize): local.IRecordingState {
        if (request.size === state.pageSize) {
            return state
        }

        return this.sendQuery({ ...state, pageSize: request.size }, true)
    }

    private setSort(state: local.IRecordingState, request: local.IToggleRecordingSort): local.IRecordingState {
        if (request.sort === state.sort) {
            return this.sendQuery(
                { ...state, sortOrder: state.sortOrder === 'ascending' ? 'descending' : 'ascending' },
                true,
            )
        }

        return this.sendQuery(
            { ...state, sort: request.sort, sortOrder: request.sort === 'created' ? 'descending' : 'ascending' },
            true,
        )
    }

    private setTextFilter(state: local.IRecordingState, request: local.ISetRecordingTextFilter): local.IRecordingState {
        if (request.text === state.search) {
            return state
        }

        return this.sendQuery({ ...state, search: request.text || '' }, true)
    }

    private setLanguageFilter(
        state: local.IRecordingState,
        request: local.ISetRecordingLanguageFilter,
    ): local.IRecordingState {
        if (request.id === state.language) {
            return state
        }

        return this.sendQuery({ ...state, language: request.id || undefined }, true)
    }

    private setRentFilter(
        state: local.IRecordingState,
        request: local.ISetRecordingRentToFilter,
    ): local.IRecordingState {
        if (request.rent === state.rent) {
            return state
        }

        return this.sendQuery({ ...state, rent: typeof request.rent === 'boolean' ? request.rent : undefined }, true)
    }

    private setGenreFilter(
        state: local.IRecordingState,
        request: local.ISetRecordingGenreFilter,
    ): local.IRecordingState {
        return this.sendQuery({ ...state, genres: request.ids || [] }, true)
    }

    private setSeriesFilter(
        state: local.IRecordingState,
        request: local.ISetRecordingSeriesFilter,
    ): local.IRecordingState {
        return this.sendQuery({ ...state, series: request.ids || [] }, true)
    }

    protected load(state: local.IRecordingState, response: local.ILoadRecordings): local.IRecordingState {
        if (response.correlationId !== state.correlationId) {
            return state
        }

        state = super.load(state, response)

        if (state.resetAfterLoad) {
            state = { ...state, page: 1 }
        }

        return {
            ...state,
            correlationId: undefined,
            count: response.count,
            genreInfo: response.genres || [],
            languageInfo: response.languages || [],
            resetAfterLoad: undefined,
            total: response.total,
        }
    }
})()

export const RecordingReducer = controller.reducer