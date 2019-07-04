import { routerActions } from 'connected-react-router'
import { v4 as uuid } from 'uuid'

import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

import { RecordingActions } from './actions'

import { EditController } from '../controller'

import { delayedDispatch, ServerApi } from '../../store'

type TRecordingActions =
    | local.ICancelRecordingEdit
    | local.ICloseRecordingDelete
    | local.ICopyRecording
    | local.ILoadRecordings
    | local.ILoadSchemas
    | local.IOpenRecordingDelete
    | local.IQueryRecordings
    | local.IRecordingDeleted
    | local.IRecordingExportDone
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
    | local.IStartRecordingEdit
    | local.IStartRecordingExport
    | local.IToggleRecordingSort

const controller = new (class extends EditController<api.IRecording, TRecordingActions, local.IRecordingState> {
    protected readonly schema = 'recording'

    protected readonly updateAllAfterSave = false

    protected readonly listRoute = local.routes.recording

    protected readonly customSave = true

    protected getReducerMap(): local.IActionHandlerMap<TRecordingActions, local.IRecordingState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.recordingActions.beginExport]: this.startExport,
            [local.recordingActions.cancel]: this.cancelEdit,
            [local.recordingActions.createCopy]: this.createCopy,
            [local.recordingActions.deleted]: this.deleteDone,
            [local.recordingActions.doneExport]: this.exportDone,
            [local.recordingActions.hideConfirm]: this.closeDelete,
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
            [local.recordingActions.showConfirm]: this.openDelete,
            [local.recordingActions.sort]: this.setSort,
            [local.recordingActions.startEdit]: this.startEdit,
        }
    }

    protected createEmpty(): api.IRecording {
        return {
            _id: '',
            containerType: api.mediaType.Undefined,
            created: '',
            genres: [],
            languages: [],
            links: [],
            name: '',
        }
    }

    protected getInitialState(): local.IRecordingState {
        return {
            ...super.getInitialState(),
            afterSave: undefined,
            correlationId: undefined,
            count: 0,
            edit: undefined,
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
            if (state.workingCopy._id) {
                ServerApi.put(`recording/${state.workingCopy._id}`, state.workingCopy, RecordingActions.saveDone)
            } else {
                ServerApi.post('recording', state.workingCopy, RecordingActions.saveDone)
            }
        }

        if (request.after === state.afterSave) {
            return state
        }

        return { ...state, afterSave: request.after }
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
            edit: undefined,
            genreInfo: response.genres || [],
            languageInfo: response.languages || [],
            resetAfterLoad: undefined,
            selected: undefined,
            total: response.total,
            validation: undefined,
            workingCopy: undefined,
        }
    }

    protected select(state: local.IRecordingState, request: local.ISelectRecording): local.IRecordingState {
        state = super.select(state, request)

        if (state.workingCopy) {
            return { ...state, edit: state.workingCopy }
        }

        if (state.edit && typeof state.edit !== 'string' && state.edit._id === request.id) {
            return state
        }

        ServerApi.get(`recording/${request.id}`, RecordingActions.startEdit)

        return { ...state, edit: request.id }
    }

    private createCopy(state: local.IRecordingState, request: local.ICopyRecording): local.IRecordingState {
        delayedDispatch(routerActions.push(`${local.routes.recording}/NEW`))

        const edit = state.workingCopy || (typeof state.edit !== 'string' && state.edit)

        if (!edit) {
            return state
        }

        return {
            ...state,
            selected: undefined,
            workingCopy: { ...edit, _id: '', name: `Kopie von ${edit.name || ''}` },
        }
    }

    protected getWorkingCopy(state: local.IRecordingState): api.IRecording {
        return typeof state.edit !== 'string' && state.edit
    }

    protected startEdit(state: local.IRecordingState, request: local.IStartRecordingEdit): local.IRecordingState {
        if (state.edit !== request.recording._id) {
            return state
        }

        return { ...state, edit: request.recording }
    }

    protected saveDone(state: local.IRecordingState, response: local.IRecordingSaved): local.IRecordingState {
        state = super.saveDone(state, response)

        if (state.validation && state.validation.length > 0) {
            return state
        }

        switch (state.afterSave) {
            case 'list':
                delayedDispatch(routerActions.push(local.routes.recording))
                break
            case 'copy':
                const { item } = response

                state = {
                    ...state,
                    selected: undefined,
                    workingCopy: { ...item, _id: '', name: `Kopie von ${item.name || ''}` },
                }

                delayedDispatch(routerActions.push(`${local.routes.recording}/NEW`))
                break
        }

        return state
    }

    protected closeDelete(state: local.IRecordingState, request: local.ICloseRecordingDelete): local.IRecordingState {
        state = super.closeDelete(state, request)

        if (request.confirm && state.selected) {
            ServerApi.delete(`recording/${state.selected}`, RecordingActions.deleteDone)
        }

        return state
    }

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
})()

export const RecordingReducer = controller.reducer
