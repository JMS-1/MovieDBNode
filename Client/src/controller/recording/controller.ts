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
    | local.IRecordingSetPage
    | local.ISaveRecording
    | local.ISelectRecording
    | local.ISetRecordingProperty<any>

const controller = new (class extends EditController<api.IRecording, TRecordingActions, local.IRecordingState> {
    protected readonly schema = 'recording'

    protected getReducerMap(): local.IActionHandlerMap<TRecordingActions, local.IRecordingState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.recordingActions.cancel]: this.cancelEdit,
            [local.recordingActions.query]: this.query,
            [local.recordingActions.queryDone]: this.load,
            [local.recordingActions.save]: this.startSave,
            [local.recordingActions.saveDone]: this.saveDone,
            [local.recordingActions.select]: this.select,
            [local.recordingActions.setPage]: this.setPage,
            [local.recordingActions.setProp]: this.setProperty,
        }
    }

    protected getInitialState(): local.IRecordingState {
        return {
            ...super.getInitialState(),
            count: 0,
            genres: [],
            languages: [],
            page: 1,
            pageSize: 15,
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

    private sendQuery(state: local.IRecordingState): local.IRecordingState {
        const req: api.IRecordingQueryRequest = {
            firstPage: state.page - 1,
            pageSize: state.pageSize,
            sort: state.sort,
            sortOrder: state.sortOrder,
        }

        ServerApi.post('recording/search', req, RecordingActions.load)

        return state
    }

    private query(state: local.IRecordingState, request: local.IQueryRecordings): local.IRecordingState {
        return this.sendQuery(state)
    }

    private setPage(state: local.IRecordingState, request: local.IRecordingSetPage): local.IRecordingState {
        const pages = Math.ceil(state.count / state.pageSize)
        const page = Math.max(1, Math.min(pages, request.page))

        if (page === state.page) {
            return state
        }

        return this.sendQuery({ ...state, page })
    }

    protected load(state: local.IRecordingState, response: local.ILoadRecordings): local.IRecordingState {
        state = super.load(state, response)

        return {
            ...state,
            count: response.count,
            genres: response.genres || [],
            languages: response.languages || [],
            total: response.total,
        }
    }
})()

export const RecordingReducer = controller.reducer
