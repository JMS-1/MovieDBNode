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
