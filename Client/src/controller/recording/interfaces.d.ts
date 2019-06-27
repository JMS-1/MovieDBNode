declare module 'movie-db-client' {
    import { Action } from 'redux'

    import * as api from 'movie-db-api'

    interface IRecordingState extends IEditState<api.IRecordingInfo> {
        readonly correlationId: string
        readonly count: number
        readonly genreInfo: api.IQueryCountInfo[]
        readonly genres: string[]
        readonly language: string
        readonly languageInfo: api.IQueryCountInfo[]
        readonly page: number
        readonly pageSize: number
        readonly resetAfterLoad: boolean
        readonly search: string
        readonly sort: api.TRecordingSort
        readonly sortOrder: api.TSortOrder
        readonly total: number
    }

    const enum recordingActions {
        cancel = 'movie-db.recordings.cancel-edit',
        query = 'movie-db.recordings.query',
        queryDone = 'movie-db.recordings.query-done',
        save = 'movie-db.recordings.save',
        saveDone = 'movie-db.recordings.save-done',
        select = 'movie-db.recordings.select',
        setGenreFilter = 'movie-db.recordings.filter-genre',
        setLanguageFilter = 'movie-db.recordings.filter-language',
        setPage = 'movie-db.recordings.set-page',
        setProp = 'movie-db.recordings.set-prop',
        setTextFilter = 'movie-db.recordings.filter-text',
        sort = 'movie-db.recordings.toggle-sort',
    }

    interface ILoadRecordings extends IGenericLoad<api.IRecording> {
        correlationId: string
        count: number
        genres: api.IQueryCountInfo[]
        languages: api.IQueryCountInfo[]
        total: number
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

    interface ISetRecordingPage extends Action {
        page: number
        type: recordingActions.setPage
    }

    interface IToggleRecordingSort extends Action {
        sort: api.TRecordingSort
        type: recordingActions.sort
    }

    interface ISetRecordingTextFilter extends Action {
        text: string
        type: recordingActions.setTextFilter
    }

    interface ISetRecordingLanguageFilter extends Action {
        id: string
        type: recordingActions.setLanguageFilter
    }

    interface ISetRecordingGenreFilter extends Action {
        ids: string[]
        type: recordingActions.setGenreFilter
    }
}
