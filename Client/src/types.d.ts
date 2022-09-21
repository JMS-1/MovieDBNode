declare module 'api' {
    interface IGenre {}

    interface ILanguage {}

    interface ILink {
        description?: string
        name: string
        url: string
    }

    interface IRecording {
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

    interface ICounted {
        _id: string
        count: number
    }

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
        genres: ICounted[]
        languages: ICounted[]
        total: number
        view: IRecording[]
    }

    interface ILanguage {
        _id: string
        name: string
    }

    interface ILanguageFindResult {
        items: ILanguage[]
    }

    interface IGenre {
        _id: string
        name: string
    }

    interface IGenreFindResult {
        items: IGenre[]
    }

    interface ISeries {
        _id: string
        description?: string
        fullName: string
        name: string
        parentId?: string
    }

    interface ISeriesFindResult {
        items: ISeries[]
    }

    interface IContainer {
        _id: string
        description?: string
        name: string
        parentId?: string
        parentLocation?: string
        type: 'Box' | 'Disk' | 'FeatureSet' | 'Folder' | 'Shelf' | 'Undefined'
    }

    interface IContainerFindResult {
        items: IContainer[]
    }
}
