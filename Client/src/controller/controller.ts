import { routerActions } from 'connected-react-router'
import { Action } from 'redux'

import { ISchemaResponse } from 'movie-db-api'
import * as local from 'movie-db-client'

import { delayedDispatch } from '../store'
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

    protected abstract createEmpty(): TItem

    protected abstract readonly listRoute: string

    protected readonly customSave: boolean = false

    protected getWorkingCopy(state: TState): TItem {
        return state.all.find(c => c._id === state.selected)
    }

    protected getInitialState(): TState {
        return <TState>{
            all: [],
            deleteOpen: false,
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

    private createNew(state: TState): TState {
        const workingCopy = this.createEmpty()

        return { ...state, selected: undefined, validation: validate(workingCopy, state.validator), workingCopy }
    }

    protected select(state: TState, request: local.IGenericSelect): TState {
        const isNew = request.id === 'NEW'
        const id = isNew ? undefined : request.id

        if (state.selected === id && state.workingCopy && (state.workingCopy._id || isNew)) {
            return state
        }

        if (isNew) {
            return this.createNew(state)
        }

        return { ...state, selected: id, validation: undefined, workingCopy: undefined }
    }

    protected setProperty<TProp extends keyof TItem>(
        state: TState,
        request: local.ISetGenericProperty<TItem, TProp>,
    ): TState {
        const current = state.workingCopy || this.getWorkingCopy(state)

        if (!current) {
            return state
        }

        if (current[request.prop] === request.value) {
            return state
        }

        const workingCopy = { ...current }

        if (request.value === undefined) {
            delete workingCopy[request.prop]
        } else {
            workingCopy[request.prop] = request.value
        }

        return this.validateItem({ ...state, workingCopy })
    }

    protected loadSchema(state: TState, response: local.ILoadSchemas): TState {
        return this.validateItem({ ...state, validator: response.schemas[this.schema] })
    }

    protected cancelEdit(state: TState, request: local.IGenericCancelEdit): TState {
        if (!state.selected) {
            return this.showList(state)
        }

        return { ...state, workingCopy: undefined, validation: undefined }
    }

    protected saveDone(state: TState, response: local.IGenericSaveDone<TItem>): TState {
        if (response.errors && response.errors.length > 0) {
            return { ...state, validation: response.errors }
        }

        const { _id } = response.item

        state = { ...state, selected: _id, workingCopy: undefined, validation: undefined }

        if (this.customSave) {
            return state
        }

        delayedDispatch(routerActions.push(`${this.listRoute}/${_id}`))

        const all = [...state.all]
        const index = all.findIndex(c => c._id === _id)

        if (index < 0) {
            all.push(response.item)
        } else {
            all[index] = response.item
        }

        return { ...state, all }
    }

    protected openDelete(state: TState, request: local.IGenericDeleteOpen): TState {
        if (state.deleteOpen) {
            return state
        }

        return { ...state, deleteOpen: true }
    }

    protected closeDelete(state: TState, request: local.IGenericDeleteClose): TState {
        if (!state.deleteOpen) {
            return state
        }

        return { ...state, deleteOpen: false }
    }

    private showList(state: TState): TState {
        delayedDispatch(routerActions.push(this.listRoute))

        return { ...state, selected: undefined, workingCopy: undefined, validation: undefined }
    }

    protected deleteDone(state: TState, request: local.IGenericDeleteDone): TState {
        if (request.errors && request.errors.length > 0) {
            return state
        }

        return this.showList(state)
    }
}
