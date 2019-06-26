declare module 'movie-db-client' {
    import { IContainer } from 'movie-db-api'

    interface IMuiState {
        readonly container: {
            readonly edit: IItemMui<IContainer>
            readonly noParent: string
        }
    }
}
