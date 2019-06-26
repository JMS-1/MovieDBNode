declare module 'movie-db-client' {
    import { Action } from 'redux'

    import * as api from 'movie-db-api'

    interface IContainerState extends IEditState<api.IContainer> {
        readonly filter: string
    }

    const enum containerActions {
        cancel = 'movie-db.containers.cancel-edit',
        filter = 'movie-db.containers.set-filter',
        load = 'movie-db.containers.load',
        save = 'movie-db.containers.save',
        saveDone = 'movie-db.containers.save-done',
        select = 'movie-db.containers.select',
        setProp = 'movie-db.containers.set-prop',
    }

    interface ILoadContainers extends IGenericLoad<api.IContainer> {
        type: containerActions.load
    }

    interface ISetContainerTreeFilter extends Action {
        filter: string
        type: containerActions.filter
    }

    interface ISetContainerProperty<TProp extends keyof api.IContainer>
        extends ISetGenericProperty<api.IContainer, TProp> {
        type: containerActions.setProp
    }

    interface ISelectContainer extends IGenericSelect {
        type: containerActions.select
    }

    interface IContainerSaved extends IGenericSaveDone<api.IContainer> {
        type: containerActions.saveDone
    }

    interface ICancelContainerEdit extends IGenericCancelEdit {
        type: containerActions.cancel
    }

    interface ISaveContainer extends Action {
        type: containerActions.save
    }
}
