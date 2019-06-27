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
            [local.recordingActions.setProp]: this.setProperty,
        }
    }

    protected getInitialState(): local.IRecordingState {
        return {
            ...super.getInitialState(),
            page: 1,
            pageSize: 15,
            sort: 'name',
            sortOrder: 'ascending',
        }
    }

    private startSave(state: local.IRecordingState, request: local.ISaveRecording): local.IRecordingState {
        if (state.workingCopy) {
            ServerApi.put(`recording/${state.workingCopy._id}`, state.workingCopy, RecordingActions.saveDone)
        }

        return state
    }

    private query(state: local.IRecordingState, request: local.IQueryRecordings): local.IRecordingState {
        const req: api.IRecordingQueryRequest = {
            firstPage: state.page - 1,
            pageSize: state.pageSize,
            sort: state.sort,
            sortOrder: state.sortOrder,
        }

        ServerApi.post('recording/search', req, RecordingActions.load)

        return state
    }

    protected load(state: local.IRecordingState, response: local.ILoadRecordings): local.IRecordingState {
        state = super.load(state, response)

        return state
    }
})()

export const RecordingReducer = controller.reducer
