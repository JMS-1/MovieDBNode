declare module 'movie-db-client' {
    import { SemanticICONS } from 'semantic-ui-react'

    import { IContainer, containerType, IRecording } from 'movie-db-api'

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
        readonly language: {
            readonly noSelect: string
        }
        readonly genre: {
            readonly noSelect: string
        }
        readonly recording: {
            readonly anyRent: string
            readonly clear: string
            readonly count: string
            readonly created: string
            readonly edit: IItemMui<IRecording>
            readonly editGenres: string
            readonly editLanguages: string
            readonly editSeries: string
            readonly genres: string
            readonly languages: string
            readonly name: string
            readonly noRent: string
            readonly saveAndBack: string
            readonly yesRent: string
        }
        readonly routes: {
            readonly container: string
            readonly recording: string
        }
        readonly save: string
        readonly search: string
        readonly series: {
            readonly noSelect: string
        }
        readonly validationError: string
        readonly webError: string
    }
}
