import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class RecordingActions {
    static load(response: api.IRecordingQueryResponse): local.ILoadRecordings {
        return {
            correlationId: response.correlationId,
            count: response.count,
            genres: response.genres,
            languages: response.languages,
            list: response.list,
            total: response.total,
            type: local.recordingActions.queryDone,
        }
    }

    static select(id: string): local.ISelectRecording {
        return { id, type: local.recordingActions.select }
    }

    static setPage(page: number): local.ISetRecordingPage {
        return { page, type: local.recordingActions.setPage }
    }

    static setPageSize(size: number): local.ISetRecordingPageSize {
        return { size, type: local.recordingActions.setSize }
    }

    static setSort(sort: api.TRecordingSort): local.IToggleRecordingSort {
        return { sort, type: local.recordingActions.sort }
    }

    static setProperty<TProp extends keyof api.IRecording>(
        prop: TProp,
        value: api.IRecording[TProp],
    ): local.ISetRecordingProperty<TProp> {
        return { prop, value, type: local.recordingActions.setProp }
    }

    static saveDone(response: api.IUpdateRecordingResponse): local.IRecordingSaved {
        return { item: response.item, errors: response.errors, type: local.recordingActions.saveDone }
    }

    static startEdit(recording: api.IRecording): local.IStartRecordingEdit {
        return { recording, type: local.recordingActions.startEdit }
    }

    static cancelEdit(): local.ICancelRecordingEdit {
        return { type: local.recordingActions.cancel }
    }

    static save(after: local.TAfterRecordingSave): local.ISaveRecording {
        return { after, type: local.recordingActions.save }
    }

    static query(): local.IQueryRecordings {
        return { type: local.recordingActions.query }
    }

    static filterText(text: string): local.ISetRecordingTextFilter {
        return { text, type: local.recordingActions.setTextFilter }
    }

    static filterLanguage(id: string): local.ISetRecordingLanguageFilter {
        return { id, type: local.recordingActions.setLanguageFilter }
    }

    static filterGenre(ids: string[]): local.ISetRecordingGenreFilter {
        return { ids, type: local.recordingActions.setGenreFilter }
    }

    static filterSeries(ids: string[]): local.ISetRecordingSeriesFilter {
        return { ids, type: local.recordingActions.setSeriesFilter }
    }

    static filterRentTo(rent: boolean): local.ISetRecordingRentToFilter {
        return { rent, type: local.recordingActions.setRentFilter }
    }

    static resetFilter(): local.IResetRecordingFilter {
        return { type: local.recordingActions.resetFilter }
    }

    static createCopy(): local.ICopyRecording {
        return { type: local.recordingActions.createCopy }
    }

    static confirmDelete(): local.IOpenRecordingDelete {
        return { type: local.recordingActions.showConfirm }
    }

    static confirmDeleteDone(confirm: boolean): local.ICloseRecordingDelete {
        return { confirm, type: local.recordingActions.hideConfirm }
    }

    static deleteDone(response: api.IDeleteRecordingResponse): local.IRecordingDeleted {
        return { id: response.id, errors: response.errors, type: local.recordingActions.deleted }
    }

    static startExport(): local.IStartRecordingExport {
        return { type: local.recordingActions.beginExport }
    }

    static exportDone(): local.IRecordingExportDone {
        return { type: local.recordingActions.doneExport }
    }
}
