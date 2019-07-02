declare module 'movie-db-client' {
    import { Action } from 'redux'

    import * as api from 'movie-db-api'

    interface IContainerState extends IEditState<api.IContainer> {
        readonly filter: string
    }

    const enum containerActions {
        cancel = 'movie-db.containers.cancel-edit',
        deleted = 'movie-db.containers.delete-done',
        filter = 'movie-db.containers.set-filter',
        hideConfirm = 'movie-db.containers.close-delete',
        load = 'movie-db.containers.load',
        save = 'movie-db.containers.save',
        saveDone = 'movie-db.containers.save-done',
        select = 'movie-db.containers.select',
        setProp = 'movie-db.containers.set-prop',
        showConfirm = 'movie-db.containers.open-delete',
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

    interface IContainerDeleted extends IGenericDeleteDone {
        type: containerActions.deleted
    }

    interface ICancelContainerEdit extends IGenericCancelEdit {
        type: containerActions.cancel
    }

    interface ISaveContainer extends Action {
        type: containerActions.save
    }

    interface IOpenContainerDelete extends IGenericDeleteOpen {
        type: containerActions.showConfirm
    }

    interface ICloseContainerDelete extends IGenericDeleteClose {
        type: containerActions.hideConfirm
    }
}
