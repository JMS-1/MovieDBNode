declare module 'movie-db-client' {
    import { IValidationError, IValidatableSchema } from '@jms-1/isxs-validation'
    import { Action } from 'redux'

    interface IClientState {
        readonly application: IApplicationState
    }

    type IItemMui<TItem> = Required<{ [prop in keyof TItem]: string }>

    const enum Separators {
        Container = ' > ',
    }

    type IActionHandlerMap<TActions extends Action, TState> = {
        [TType in TActions['type']]: (state: TState, action: { type: TType }) => TState
    }

    interface IEditState<TItem> {
        readonly all: TItem[]
        readonly deleteOpen: boolean
        readonly selected: string
        readonly validation: IValidationError[]
        readonly validator: IValidatableSchema
        readonly workingCopy: TItem
    }

    interface IGenericLoad<TItem> extends Action {
        list: TItem[]
    }

    interface IGenericSelect extends Action {
        id: string
    }

    interface ISetGenericProperty<TItem, TProp extends keyof TItem> extends Action {
        prop: TProp
        value: TItem[TProp]
    }

    interface IGenericCancelEdit extends Action {}

    interface IGenericSaveDone<TItem> extends Action {
        item: TItem
        errors: IValidationError[]
    }

    interface IGenericDeleteDone extends Action {
        id: string
        errors: IValidationError[]
    }

    interface IGenericDeleteOpen extends Action {}

    interface IGenericDeleteClose extends Action {
        confirm: boolean
    }

    interface ITreeItem {
        _id: string
        name: string
        parentId?: string
    }

    interface ITreeStructure {
        [id: string]: string[]
    }
}
