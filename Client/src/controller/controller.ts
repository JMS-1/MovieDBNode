import { Action } from 'redux'

export type IActionHandlerMap<TActions extends Action, TState> = {
    [TType in TActions['type']]: (state: TState, action: { type: TType }) => TState
}

export abstract class Controller<TActions extends Action, TState> {
    protected abstract getReducerMap(): IActionHandlerMap<TActions, TState>

    protected abstract getInitialState(): TState

    private _reducerMap: IActionHandlerMap<TActions, TState>

    readonly reducer = (state: TState, action: TActions): TState => {
        if (!state) {
            state = this.getInitialState()
        }

        if (!this._reducerMap) {
            this._reducerMap = this.getReducerMap()

            for (let prop in this._reducerMap) {
                if (this._reducerMap.hasOwnProperty(prop)) {
                    const type = <TActions['type']>prop

                    this._reducerMap[type] = this._reducerMap[type].bind(this)
                }
            }
        }

        const handler = this._reducerMap[<TActions['type']>action.type]

        if (handler) {
            return handler(state, <Action>action)
        }

        return state
    }
}
