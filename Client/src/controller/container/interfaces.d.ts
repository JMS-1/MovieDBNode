declare module 'movie-db-client' {
    import { Action } from 'redux'

    import * as api from 'movie-db-api'

    interface IContainerState {
        readonly all: api.IContainer[]
        readonly filter: string
        readonly selected: string
        readonly validation: api.IValidationError[]
        readonly validator: api.IValidatableSchema
        readonly workingCopy: api.IContainer
    }

    const enum containerActions {
        filter = 'movie-db.containers.set-filter',
        load = 'movie-db.containers.load',
        setEdit = 'movie-db.containers.set-select',
        setProp = 'movie-db.containers.set-prop',
    }

    interface ILoadContainers extends Action {
        containers: api.IContainer[]
        type: containerActions.load
    }

    interface ISetContainerTreeFilter extends Action {
        filter: string
        type: containerActions.filter
    }

    interface ISetContainerProperty<TProp extends keyof api.IContainer> extends Action {
        prop: TProp
        type: containerActions.setProp
        value: api.IContainer[TProp]
    }

    interface ISetContainerStartEdit extends Action {
        id: string
        type: containerActions.setEdit
    }
}
