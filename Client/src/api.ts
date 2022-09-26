export interface IGenre {}

export interface ILanguage {}

export interface ILink {
    description?: string
    name: string
    url: string
}

export interface IRecording {
    _id: string
    containerId?: string
    containerPosition?: string
    containerType: 'BluRay' | 'DVD' | 'RecordedDVD' | 'SuperVideoCD' | 'Undefined' | 'VideoCD'
    created: string
    description?: string
    fullName: string
    genres: string[]
    languages: string[]
    links: ILink[]
    name: string
    rentTo?: string
    series?: string
}

export interface ICounted {
    _id: string
    count: number
}

export interface IRecordingQueryRequest {
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

export interface IRecordingQueryResult {
    correlationId: string
    count: number
    genres: ICounted[]
    languages: ICounted[]
    total: number
    view: IRecording[]
}

export interface ILanguage {
    _id: string
    name: string
}

export interface ILanguageFindResult {
    items: ILanguage[]
}

export interface IGenre {
    _id: string
    name: string
}

export interface IGenreFindResult {
    items: IGenre[]
}

export interface ISeries {
    _id: string
    description?: string
    fullName: string
    name: string
    parentId?: string
}

export interface ISeriesFindResult {
    items: ISeries[]
}

export enum containerType {
    Box = 2,
    Disk = 4,
    FeatureSet = 1,
    Folder = 5,
    Shelf = 3,
    Undefined = 0,
}

export interface IContainer {
    _id: string
    description?: string
    name: string
    parentId?: string
    parentLocation?: string
    type: containerType
}

export interface IContainerFindResult {
    items: IContainer[]
}
