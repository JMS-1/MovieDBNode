declare module 'movie-db-client' {
    import { RouterState } from 'connected-react-router'

    interface IClientState {
        readonly application: IApplicationState
        readonly container: IContainerState
        readonly mui: IMuiState
        readonly router: RouterState
    }
}
