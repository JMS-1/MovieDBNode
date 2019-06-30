import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

import { ContainerActions } from './actions'

import { EditController } from '../controller'

import { ServerApi } from '../../store'

type TContainerActions =
    | local.ICancelContainerEdit
    | local.IContainerSaved
    | local.ILoadContainers
    | local.ILoadSchemas
    | local.ISaveContainer
    | local.ISelectContainer
    | local.ISetContainerProperty<any>
    | local.ISetContainerTreeFilter

const controller = new (class extends EditController<api.IContainer, TContainerActions, local.IContainerState> {
    protected readonly schema = 'container'

    protected getReducerMap(): local.IActionHandlerMap<TContainerActions, local.IContainerState> {
        return {
            [local.applicationActions.loadSchema]: this.loadSchema,
            [local.containerActions.cancel]: this.cancelEdit,
            [local.containerActions.filter]: this.setFilter,
            [local.containerActions.load]: this.load,
            [local.containerActions.save]: this.startSave,
            [local.containerActions.saveDone]: this.saveDone,
            [local.containerActions.select]: this.select,
            [local.containerActions.setProp]: this.setProperty,
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
})()

export const ContainerReducer = controller.reducer
