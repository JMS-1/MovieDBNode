import { Action } from 'redux'

import { ISchemaResponse } from 'movie-db-api'
import * as local from 'movie-db-client'

import { validate } from '../validation'

export abstract class Controller<TActions extends Action, TState> {
    protected abstract getReducerMap(): local.IActionHandlerMap<TActions, TState>

    protected abstract getInitialState(): TState

    private _reducerMap: local.IActionHandlerMap<TActions, TState>

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

export abstract class EditController<
    TItem extends { _id: string },
    TActions extends Action,
    TState extends local.IEditState<TItem>
> extends Controller<TActions, TState> {
    protected abstract readonly schema: keyof ISchemaResponse

    protected getWorkingCopy(state: TState): TItem {
        return state.all.find(c => c._id === state.selected)
    }

    protected getInitialState(): TState {
        return <TState>{
            all: [],
            selected: undefined,
            validation: undefined,
            validator: undefined,
            workingCopy: undefined,
        }
    }

    protected validateItem(state: TState): TState {
        if (!state.workingCopy || !state.validator) {
            return state
        }

        return { ...state, validation: validate(state.workingCopy, state.validator) }
    }

    protected load(state: TState, response: local.IGenericLoad<TItem>): TState {
        return { ...state, all: response.list || [], validation: undefined }
    }

    protected select(state: TState, request: local.IGenericSelect): TState {
        if (state.selected === request.id) {
            return state
        }

        return { ...state, selected: request.id, validation: undefined, workingCopy: undefined }
    }

    protected setProperty<TProp extends keyof TItem>(
        state: TState,
        request: local.ISetGenericProperty<TItem, TProp>,
    ): TState {
        const workingCopy = state.workingCopy || this.getWorkingCopy(state)

        if (!workingCopy) {
            return state
        }

        if (workingCopy[request.prop] === request.value) {
            return state
        }

        return this.validateItem({ ...state, workingCopy: { ...workingCopy, [request.prop]: request.value } })
    }

    protected loadSchema(state: TState, response: local.ILoadSchemas): TState {
        return this.validateItem({ ...state, validator: response.schemas[this.schema] })
    }

    protected cancelEdit(state: TState, request: local.IGenericCancelEdit): TState {
        if (!state.workingCopy) {
            return state
        }

        return { ...state, validation: undefined, workingCopy: undefined }
    }

    protected saveDone(state: TState, response: local.IGenericSaveDone<TItem>): TState {
        if (response.errors) {
            return { ...state, validation: response.errors }
        }

        const { _id } = response.item

        const all = [...state.all]
        const index = all.findIndex(c => c._id === _id)

        if (index >= 0) {
            all[index] = response.item
        }

        return { ...state, all, selected: _id, workingCopy: undefined, validation: undefined }
    }
}
