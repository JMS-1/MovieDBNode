declare module 'api' {
    interface IGenre {}

    interface ILanguage {}

    interface IRecording {}

    interface IRecordingQueryResult {
        correlationId: string
        count: number
        genres: IGenre[]
        languages: ILanguage[]
        total: number
        view: IRecording[]
    }
}
