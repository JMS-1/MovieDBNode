declare module 'movie-db-client' {
    import { Action } from 'redux'

    import * as api from 'movie-db-api'

    interface IRecordingState extends IEditState<api.IRecording> {
        readonly page: number
        readonly pageSize: number
        readonly sort: api.TRecordingSort
        readonly sortOrder: api.TSortOrder
    }

    const enum recordingActions {
        cancel = 'movie-db.recordings.cancel-edit',
        query = 'movie-db.recordings.query',
        queryDone = 'movie-db.recordings.query-done',
        save = 'movie-db.recordings.save',
        saveDone = 'movie-db.recordings.save-done',
        select = 'movie-db.recordings.select',
        setProp = 'movie-db.recordings.set-prop',
    }

    interface ILoadRecordings extends IGenericLoad<api.IRecording> {
        type: recordingActions.queryDone
    }

    interface ISetRecordingProperty<TProp extends keyof api.IRecording>
        extends ISetGenericProperty<api.IRecording, TProp> {
        type: recordingActions.setProp
    }

    interface ISelectRecording extends IGenericSelect {
        type: recordingActions.select
    }

    interface IRecordingSaved extends IGenericSaveDone<api.IRecording> {
        type: recordingActions.saveDone
    }

    interface ICancelRecordingEdit extends IGenericCancelEdit {
        type: recordingActions.cancel
    }

    interface ISaveRecording extends Action {
        type: recordingActions.save
    }

    interface IQueryRecordings extends Action {
        type: recordingActions.query
    }
}
