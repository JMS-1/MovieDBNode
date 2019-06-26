declare module 'movie-db-client' {
    import { SemanticICONS } from 'semantic-ui-react'

    import { IContainer, containerType } from 'movie-db-api'

    interface IContainerTypeMui {
        readonly title: string
        readonly icon: SemanticICONS
    }

    interface IMuiState {
        readonly cancel: string
        readonly container: {
            readonly edit: IItemMui<IContainer>
            readonly noParent: string
            readonly types: { readonly [type in containerType]: IContainerTypeMui }
        }
        readonly error: string
        readonly save: string
    }
}
