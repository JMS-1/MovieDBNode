declare module 'movie-db-client' {
    import { Action } from 'redux'

    import * as api from 'movie-db-api'

    type TAfterRecordingSave = 'list'

    interface IRecordingState extends IEditState<api.IRecordingInfo> {
        readonly afterSave: TAfterRecordingSave
        readonly correlationId: string
        readonly count: number
        readonly edit: string | api.IRecording
        readonly genreInfo: api.IQueryCountInfo[]
        readonly genres: string[]
        readonly language: string
        readonly languageInfo: api.IQueryCountInfo[]
        readonly page: number
        readonly pageSize: number
        readonly rent: boolean
        readonly resetAfterLoad: boolean
        readonly search: string
        readonly series: string[]
        readonly sort: api.TRecordingSort
        readonly sortOrder: api.TSortOrder
        readonly total: number
    }

    const enum recordingActions {
        cancel = 'movie-db.recordings.cancel-edit',
        startEdit = 'movie-db.recordings.start-edit',
        query = 'movie-db.recordings.query',
        queryDone = 'movie-db.recordings.query-done',
        resetFilter = 'movie-db.recordings.reset-filter',
        save = 'movie-db.recordings.save',
        saveDone = 'movie-db.recordings.save-done',
        select = 'movie-db.recordings.select',
        setGenreFilter = 'movie-db.recordings.filter-genre',
        setLanguageFilter = 'movie-db.recordings.filter-language',
        setPage = 'movie-db.recordings.set-page',
        setProp = 'movie-db.recordings.set-prop',
        setRentFilter = 'movie-db.recordings.filter-rent',
        setSeriesFilter = 'movie-db.recordings.filter-series',
        setSize = 'movie-db.recordings.set-page-size',
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
        after: TAfterRecordingSave
        type: recordingActions.save
    }

    interface IQueryRecordings extends Action {
        type: recordingActions.query
    }

    interface ISetRecordingPage extends Action {
        page: number
        type: recordingActions.setPage
    }

    interface ISetRecordingPageSize extends Action {
        size: number
        type: recordingActions.setSize
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

    interface ISetRecordingSeriesFilter extends Action {
        ids: string[]
        type: recordingActions.setSeriesFilter
    }

    interface ISetRecordingRentToFilter extends Action {
        rent: boolean
        type: recordingActions.setRentFilter
    }

    interface IResetRecordingFilter extends Action {
        type: recordingActions.resetFilter
    }

    interface IStartRecordingEdit extends Action {
        recording: api.IRecording
        type: recordingActions.startEdit
    }
}
