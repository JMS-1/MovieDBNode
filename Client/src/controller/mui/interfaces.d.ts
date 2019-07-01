declare module 'movie-db-client' {
    import { SemanticICONS } from 'semantic-ui-react'

    import { IContainer, containerType, IRecording, IRecordingLink, mediaType } from 'movie-db-api'

    interface IContainerTypeMui {
        readonly title: string
        readonly icon: SemanticICONS
    }

    interface IMuiState {
        readonly cancel: string
        readonly container: {
            readonly edit: IItemMui<IContainer>
            readonly noId: string
            readonly noParent: string
            readonly types: { readonly [type in containerType]: IContainerTypeMui }
        }
        readonly create: string
        readonly language: {
            readonly noSelect: string
        }
        readonly genre: {
            readonly noSelect: string
        }
        readonly media: {
            readonly types: { readonly [type in mediaType]: string }
        }
        readonly recording: {
            readonly anyRent: string
            readonly clear: string
            readonly count: string
            readonly created: string
            readonly edit: IItemMui<IRecording>
            readonly editContainer: string
            readonly editGenres: string
            readonly editLanguages: string
            readonly editSeries: string
            readonly editType: string
            readonly genres: string
            readonly languages: string
            readonly linkEdit: IItemMui<IRecordingLink>
            readonly name: string
            readonly noId: string
            readonly noRent: string
            readonly saveAndBack: string
            readonly yesRent: string
        }
        readonly reset: string
        readonly routes: {
            readonly container: string
            readonly create: {
                readonly container: string
                readonly genre: string
                readonly language: string
                readonly recording: string
                readonly series: string
                readonly title: string
            }
            readonly genre: string
            readonly language: string
            readonly recording: string
            readonly series: string
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
