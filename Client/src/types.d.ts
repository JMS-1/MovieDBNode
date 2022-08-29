declare module 'api' {
    interface IGenre {}

    interface ILanguage {}

    interface IRecording {}

    interface IRecordingQueryRequest {
        correlationId?: string
        firstPage: number
        forExport?: boolean
        fullName?: string
        genres?: string[]
        language?: string
        pageSize: number
        rent?: boolean
        series?: string[]
        sort: 'created' | 'fullName'
        sortOrder: 'Ascending' | 'Descending'
    }

    interface IRecordingQueryResult {
        correlationId: string
        count: number
        genres: IGenre[]
        languages: ILanguage[]
        total: number
        view: IRecording[]
    }
}
