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
    }

    const enum containerType {
        Box = 2,
        Disk = 4,
        FeatureSet = 1,
        Folder = 5,
        Shelf = 3,
        Undefined = 0,
    }
}
