declare module 'movie-db-client' {
    import { SemanticICONS } from 'semantic-ui-react'

    import * as api from 'movie-db-api'

    interface IContainerTypeMui {
        readonly title: string
        readonly icon: SemanticICONS
    }

    interface IMuiState {
        readonly cancel: string
        readonly confirm: string
        readonly container: {
            readonly confirmHtml: string
            readonly edit: IItemMui<api.IContainer>
            readonly name: string
            readonly noId: string
            readonly noParent: string
            readonly position: string
            readonly types: { readonly [type in api.containerType]: IContainerTypeMui }
        }
        readonly create: string
        readonly language: {
            readonly confirmHtml: string
            readonly edit: IItemMui<api.ILanguage>
            readonly noId: string
            readonly noSelect: string
        }
        readonly genre: {
            readonly confirmHtml: string
            readonly edit: IItemMui<api.IGenre>
            readonly noId: string
            readonly noSelect: string
        }
        readonly media: {
            readonly types: { readonly [type in api.mediaType]: string }
        }
        readonly no: string
        readonly recording: {
            readonly anyRent: string
            readonly clear: string
            readonly confirmHtml: string
            readonly count: string
            readonly createCopy: string
            readonly created: string
            readonly edit: IItemMui<api.IRecording>
            readonly editContainer: string
            readonly editGenres: string
            readonly editLanguages: string
            readonly editSeries: string
            readonly editType: string
            readonly export: string
            readonly genres: string
            readonly languages: string
            readonly linkEdit: IItemMui<api.IRecordingLink>
            readonly name: string
            readonly noId: string
            readonly noRent: string
            readonly saveAndBack: string
            readonly saveAndCopy: string
            readonly yesRent: string
        }
        readonly remove: string
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
            readonly confirmHtml: string
            readonly edit: IItemMui<api.ISeries>
            readonly noId: string
            readonly noParent: string
            readonly noSelect: string
        }
        readonly themes: {
            readonly default: string
            readonly theme1: string
            readonly theme2: string
            readonly title: string
        }
        readonly validationError: string
        readonly webError: string
        readonly yes: string
    }
}
