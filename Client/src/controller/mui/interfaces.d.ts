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
        readonly recording: {
            readonly name: string
            readonly created: string
            readonly languages: string
            readonly genres: string
        }
        readonly save: string
        readonly search: string
        readonly validationError: string
        readonly webError: string
    }
}
