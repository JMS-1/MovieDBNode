import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class RecordingActions {
    static load(response: api.IRecordingQueryResponse): local.ILoadRecordings {
        return {
            count: response.count,
            genres: response.genres,
            languages: response.languages,
            list: response.view,
            total: response.total,
            type: local.recordingActions.queryDone,
        }
    }

    static select(id: string): local.ISelectRecording {
        return { id, type: local.recordingActions.select }
    }

    static setPage(page: number): local.IRecordingSetPage {
        return { page, type: local.recordingActions.setPage }
    }

    static setProperty<TProp extends keyof api.IRecording>(
        prop: TProp,
        value: api.IRecording[TProp],
    ): local.ISetRecordingProperty<TProp> {
        return { prop, value, type: local.recordingActions.setProp }
    }

    static saveDone(response: api.IUpdateRecordingResponse): local.IRecordingSaved {
        return { item: response.recording, errors: response.errors, type: local.recordingActions.saveDone }
    }

    static cancelEdit(): local.ICancelRecordingEdit {
        return { type: local.recordingActions.cancel }
    }

    static save(): local.ISaveRecording {
        return { type: local.recordingActions.save }
    }

    static query(): local.IQueryRecordings {
        return { type: local.recordingActions.query }
    }
}
