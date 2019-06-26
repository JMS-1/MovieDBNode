declare module 'movie-db-client' {
    import { SemanticICONS } from 'semantic-ui-react'

    import { RouterState } from 'connected-react-router'

    interface IClientState {
        readonly application: IApplicationState
        readonly container: IContainerState
        readonly genre: IGenreState
        readonly language: ILanguageState
        readonly media: IMediaState
        readonly mui: IMuiState
        readonly router: RouterState
        readonly series: ISeriesState
    }

    type IItemMui<TItem> = Required<{ [prop in keyof TItem]: string }>

    const enum Separators {
        Container = ' > ',
        Series = ' > ',
    }

    interface IIconSelectOption<TValue> {
        readonly icon: { name: SemanticICONS }
        readonly key: TValue
        readonly text: string
        readonly value: TValue
    }
}
