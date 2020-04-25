declare module 'movie-db-client' {
    import { Action } from 'redux'

    interface IClientState {
        readonly application: IApplicationState
    }

    type IActionHandlerMap<TActions extends Action, TState> = {
        [TType in TActions['type']]: (state: TState, action: { type: TType }) => TState
    }
}
