declare module 'movie-db-client' {
    import { Action } from 'redux'
    import { RouterState } from 'connected-react-router'
    import { SemanticICONS, DropdownItemProps } from 'semantic-ui-react'

    import { IValidationError, IValidatableSchema } from 'movie-db-api'

    interface IClientState {
        readonly application: IApplicationState
        readonly container: IContainerState
        readonly genre: IGenreState
        readonly language: ILanguageState
        readonly mui: IMuiState
        readonly router: RouterState
        readonly series: ISeriesState
        readonly recording: IRecordingState
    }

    type IItemMui<TItem> = Required<{ [prop in keyof TItem]: string }>

    const enum Separators {
        Container = ' > ',
        Series = ' > ',
    }

    type IActionHandlerMap<TActions extends Action, TState> = {
        [TType in TActions['type']]: (state: TState, action: { type: TType }) => TState
    }

    interface IEditState<TItem> {
        readonly all: TItem[]
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

    const enum routes {
        container = '/container',
        recording = '/recording',
    }
}
