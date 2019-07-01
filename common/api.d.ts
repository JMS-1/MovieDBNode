declare module 'movie-db-api' {
    interface IVersionResponse {
        version: string
    }

    interface IValidationScope {
        readonly items?: any
        readonly message?: string
        readonly properties?: any
    }

    interface IValidatableSchema extends IValidationScope {
        readonly $id: string
    }

    interface IValidationError {
        readonly constraint: string
        readonly message: string
        readonly property: string
    }

    interface ISchemaResponse {
        container: IValidatableSchema
        genre: IValidatableSchema
        language: IValidatableSchema
        recording: IValidatableSchema
        series: IValidatableSchema
    }

    const enum containerType {
        Box = 2,
        Disk = 4,
        FeatureSet = 1,
        Folder = 5,
        Shelf = 3,
        Undefined = 0,
    }

    const enum mediaType {
        BluRay = 5,
        DVD = 4,
        RecordedDVD = 3,
        SuperVideoCD = 2,
        Undefined = 0,
        VideoCD = 1,
    }

    interface INewContainer {
        name: string
        type: containerType
        description?: string
        parentId?: string
        parentLocation?: string
    }

    interface IContainer extends INewContainer {
        _id: string
    }

    interface IContainerResponse {
        containers: IContainer[]
    }

    interface IAddContainerResponse {
        container: IContainer
        errors: IValidationError[]
    }

    interface IUpdateContainerResponse {
        container: IContainer
        errors: IValidationError[]
    }

    interface IDeleteContainerResponse {
        errors: IValidationError[]
        id: string
    }

    interface INewGenre {
        name: string
    }

    interface IGenre extends INewGenre {
        _id: string
    }

    interface IGenreResponse {
        genres: IGenre[]
    }

    interface IUpdateGenreResponse {
        genre: IGenre
        errors: IValidationError[]
    }

    interface IDeleteGenreResponse {
        errors: IValidationError[]
        id: string
    }

    interface INewLanguage {
        name: string
    }

    interface ILanguage extends INewLanguage {
        _id: string
    }

    interface ILanguageResponse {
        languages: ILanguage[]
    }

    interface IUpdateLanguageResponse {
        language: ILanguage
        errors: IValidationError[]
    }

    interface IDeleteLanguageResponse {
        errors: IValidationError[]
        id: string
    }

    interface INewSeries {
        name: string
        description?: string
        parentId?: string
    }

    interface ISeries extends INewSeries {
        _id: string
    }

    interface ISeriesResponse {
        series: ISeries[]
    }

    interface IUpdateSeriesResponse {
        series: ISeries
        errors: IValidationError[]
    }

    interface IDeleteSeriesResponse {
        errors: IValidationError[]
        id: string
    }

    type TRecordingSort = 'fullName' | 'created'

    type TSortOrder = 'ascending' | 'descending'

    interface IRecordingQueryRequest {
        correlationId: string
        firstPage: number
        fullName?: string
        genres?: string[]
        language?: string
        pageSize: number
        rent?: boolean
        series?: string[]
        sort: TRecordingSort
        sortOrder: TSortOrder
    }

    interface IQueryCountInfo {
        _id: string
        count: number
    }

    interface IRecordingLink {
        description?: string
        name: string
        url: string
    }

    interface INewRecording {
        containerId?: string
        containerPosition?: string
        containerType: mediaType
        description?: string
        genres: string[]
        languages: string[]
        links: IRecordingLink[]
        name: string
        rentTo?: string
        series?: string
    }

    interface IRecording extends INewRecording {
        _id: string
        created: string
    }

    interface IRecordingInfo extends IRecording {
        fullName: string
    }

    interface IRecordingQueryResponse {
        correlationId: string
        count: number
        genres: IQueryCountInfo[]
        languages: IQueryCountInfo[]
        total: number
        view: IRecordingInfo[]
    }

    interface IAddRecordingResponse {
        errors: IValidationError[]
        recording: IRecording
    }

    interface IUpdateRecordingResponse {
        errors: IValidationError[]
        recording: IRecording
    }

    interface IDeleteRecordingResponse {
        errors: IValidationError[]
        id: string
    }
}
