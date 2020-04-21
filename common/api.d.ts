declare module 'movie-db-api' {
    import { IValidationError, IValidatableSchema } from '@jms-1/isxs-validation'

    // Generische API

    type TItem<TNewItem> = TNewItem & { _id: string }

    interface IApiQueryResponse<TItem> {
        list: TItem[]
    }

    interface IApiUpdateResponse<TItem> {
        item: TItem
        errors: IValidationError[]
    }

    interface IApiDeleteResponse {
        id: string
        errors: IValidationError[]
    }

    // Version

    interface IVersionResponse {
        version: string
    }

    // Schema und Validierung

    interface ISchemaResponse {
        recording: IValidatableSchema
    }

    // Ablage

    const enum containerType {
        Box = 2,
        Disk = 4,
        FeatureSet = 1,
        Folder = 5,
        Shelf = 3,
        Undefined = 0,
    }

    interface INewContainer {
        name: string
        type: containerType
        description?: string
        parentId?: string
        parentLocation?: string
    }

    type IContainer = TItem<INewContainer>

    type IContainerResponse = IApiQueryResponse<IContainer>

    type IUpdateContainerResponse = IApiUpdateResponse<IContainer>

    type IDeleteContainerResponse = IApiDeleteResponse

    // Kategorie

    interface INewGenre {
        name: string
    }

    type IGenre = TItem<INewGenre>

    type IGenreResponse = IApiQueryResponse<IGenre>

    type IUpdateGenreResponse = IApiUpdateResponse<IGenre>

    type IDeleteGenreResponse = IApiDeleteResponse

    // Sprache

    interface INewLanguage {
        name: string
    }

    type ILanguage = TItem<INewLanguage>

    type ILanguageResponse = IApiQueryResponse<ILanguage>

    type IUpdateLanguageResponse = IApiUpdateResponse<ILanguage>

    type IDeleteLanguageResponse = IApiDeleteResponse

    // Serie

    interface INewSeries {
        description?: string
        fullName?: string
        name: string
        parentId?: string
    }

    type ISeries = TItem<INewSeries>

    type ISeriesResponse = IApiQueryResponse<ISeries>

    type IUpdateSeriesResponse = IApiUpdateResponse<ISeries>

    type IDeleteSeriesResponse = IApiDeleteResponse

    // Aufzeichnung

    interface IRecordingLink {
        description?: string
        name: string
        url: string
    }

    const enum mediaType {
        BluRay = 5,
        DVD = 4,
        RecordedDVD = 3,
        SuperVideoCD = 2,
        Undefined = 0,
        VideoCD = 1,
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

    interface IRecording extends TItem<INewRecording> {
        created: string
        fullName?: string
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

    interface IRecordingQueryResponse extends IApiQueryResponse<IRecording> {
        correlationId: string
        count: number
        genres: IQueryCountInfo[]
        languages: IQueryCountInfo[]
        total: number
    }

    type IUpdateRecordingResponse = IApiUpdateResponse<IRecording>

    type IDeleteRecordingResponse = IApiDeleteResponse
}
