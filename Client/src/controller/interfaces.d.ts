declare module 'movie-db-client' {
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
}
