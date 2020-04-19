import * as local from 'movie-db-client'

import * as api from 'movie-db-api'

import { ContainerActions } from './actions'

import { ServerApi } from '../../store'
import { routes } from '../../stores/routes'
import { EditController } from '../controller'

type TContainerActions =
    | local.ICancelContainerEdit
    | local.ICloseContainerDelete
    | local.IContainerDeleted
    | local.IContainerSaved
    | local.ILoadContainerRecordings
    | local.ILoadContainers
    | local.ILoadSchemas
    | local.IOpenContainerDelete
    | local.ISaveContainer
    | local.ISelectContainer
    | local.ISetContainerProperty<any>
    | local.ISetContainerTreeFilter

const controller = new (class extends EditController<api.IContainer, TContainerActions, local.IContainerState> {
    protected readonly schema = 'container'

    protected readonly listRoute = routes.container

    protected getReducerMap(): local.IActionHandlerMap<TContainerActions, local.IContainerState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.containerActions.cancel]: this.cancelEdit,
            [local.containerActions.deleted]: this.deleteDone,
            [local.containerActions.filter]: this.setFilter,
            [local.containerActions.hideConfirm]: this.closeDelete,
            [local.containerActions.load]: this.load,
            [local.containerActions.loadRecordings]: this.loadRecordings,
            [local.containerActions.save]: this.startSave,
            [local.containerActions.saveDone]: this.saveDone,
            [local.containerActions.select]: this.select,
            [local.containerActions.setProp]: this.setProperty,
            [local.containerActions.showConfirm]: this.openDelete,
        }
    }

    protected createEmpty(): api.IContainer {
        return {
            _id: '',
            name: '',
            type: api.containerType.Undefined,
        }
    }

    protected getInitialState(): local.IContainerState {
        return {
            ...super.getInitialState(),
            filter: '',
            recordings: [],
        }
    }

    private setFilter(state: local.IContainerState, request: local.ISetContainerTreeFilter): local.IContainerState {
        if (request.filter === state.filter) {
            return state
        }

        return { ...state, filter: request.filter }
    }

    private startSave(state: local.IContainerState, request: local.ISaveContainer): local.IContainerState {
        if (state.workingCopy) {
            if (state.workingCopy._id) {
                ServerApi.put(`container/${state.workingCopy._id}`, state.workingCopy, ContainerActions.saveDone)
            } else {
                ServerApi.post('container', state.workingCopy, ContainerActions.saveDone)
            }
        }

        return state
    }

    protected closeDelete(state: local.IContainerState, request: local.ICloseContainerDelete): local.IContainerState {
        state = super.closeDelete(state, request)

        if (request.confirm && state.selected) {
            ServerApi.delete(`container/${state.selected}`, ContainerActions.deleteDone)
        }

        return state
    }

    protected deleteDone(state: local.IContainerState, request: local.IContainerDeleted): local.IContainerState {
        state = super.deleteDone(state, request)

        if (!request.errors || request.errors.length < 1) {
            ServerApi.get('container', ContainerActions.load)
        }

        return state
    }

    private loadRecordings(
        state: local.IContainerState,
        response: local.ILoadContainerRecordings
    ): local.IContainerState {
        return { ...state, recordings: response.recordings || [] }
    }

    protected select(state: local.IContainerState, request: local.ISelectContainer): local.IContainerState {
        state = super.select(state, request)

        if (state.selected) {
            ServerApi.get(`recording/container/${state.selected}`, ContainerActions.loadRecordings)
        }

        return { ...state, recordings: [] }
    }
})()

export const ContainerReducer = controller.reducer
