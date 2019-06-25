declare module 'movie-db-api' {
    interface IVersionResponse {
        version: string
    }

    interface IValidationScope {
        readonly message: string
        readonly properties?: any
    }

    interface IValidatableSchema extends IValidationScope {
        readonly $id: string
    }

    interface IValidationError {
        readonly contraint: string
        readonly message: string
        readonly property: string
    }

    interface ISchemaResponse {
        container: IValidatableSchema
        genre: IValidatableSchema
        language: IValidatableSchema
        media: IValidatableSchema
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
        id: string
    }

    interface IContainerResponse {
        containers: IContainer[]
    }

    interface IAddContainerRequest {
        container: INewContainer
    }

    interface IAddContainerResponse {
        container: IContainer
    }

    interface IUpdateContainerRequest {
        container: IContainer
    }

    interface IUpdateContainerResponse {
        container: IContainer
    }

    interface IDeleteContainerRequest {
        id: string
    }

    interface IDeleteContainerResponse {
        id: string
    }
}
