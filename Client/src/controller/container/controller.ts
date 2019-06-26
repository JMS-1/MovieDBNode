import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

import { ContainerActions } from './actions'

import { Controller, IActionHandlerMap } from '../controller'

import { ServerApi } from '../../store'
import { validate } from '../../validation'

function validateContainer(state: local.IContainerState): local.IContainerState {
    if (!state.workingCopy || !state.validator) {
        return state
    }

    return { ...state, validation: validate(state.workingCopy, state.validator) }
}

export type TContainerActions =
    | local.ICancelContainerEdit
    | local.IContainerSaved
    | local.ILoadContainers
    | local.ILoadSchemas
    | local.ISaveContainer
    | local.ISelectContainer
    | local.ISetContainerProperty<any>
    | local.ISetContainerTreeFilter

const controller = new (class extends Controller<TContainerActions, local.IContainerState> {
    protected getReducerMap(): IActionHandlerMap<TContainerActions, local.IContainerState> {
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

    protected getInitialState(): local.IContainerState {
        return {
            all: [],
            filter: '',
            selected: undefined,
            validation: undefined,
            validator: undefined,
            workingCopy: undefined,
        }
    }

    private load(state: local.IContainerState, response: local.ILoadContainers): local.IContainerState {
        return { ...state, all: response.containers || [], validation: undefined }
    }

    private setFilter(state: local.IContainerState, request: local.ISetContainerTreeFilter): local.IContainerState {
        if (request.filter === state.filter) {
            return state
        }

        return { ...state, filter: request.filter }
    }

    private select(state: local.IContainerState, request: local.ISelectContainer): local.IContainerState {
        if (state.selected === request.id) {
            return state
        }

        return { ...state, selected: request.id, validation: undefined, workingCopy: undefined }
    }

    private setProperty<TProp extends keyof api.IContainer>(
        state: local.IContainerState,
        request: local.ISetContainerProperty<TProp>
    ): local.IContainerState {
        const workingCopy = state.workingCopy || state.all.find(c => c._id === state.selected)

        if (!workingCopy) {
            return state
        }

        if (workingCopy[request.prop] === request.value) {
            return state
        }

        return validateContainer({ ...state, workingCopy: { ...workingCopy, [request.prop]: request.value } })
    }

    private loadSchema(state: local.IContainerState, response: local.ILoadSchemas): local.IContainerState {
        return validateContainer({ ...state, validator: response.schemas.container })
    }

    private saveDone(state: local.IContainerState, response: local.IContainerSaved): local.IContainerState {
        if (response.errors) {
            return { ...state, validation: response.errors }
        }

        const { _id } = response.container

        const all = [...state.all]
        const index = all.findIndex(c => c._id === _id)

        if (index >= 0) {
            all[index] = response.container
        }

        return { ...state, all, selected: _id, workingCopy: undefined, validation: undefined }
    }

    private cancelEdit(state: local.IContainerState, request: local.ICancelContainerEdit): local.IContainerState {
        if (!state.workingCopy) {
            return state
        }

        return { ...state, validation: undefined, workingCopy: undefined }
    }

    private startSave(state: local.IContainerState, request: local.ISaveContainer): local.IContainerState {
        if (state.workingCopy) {
            ServerApi.put(`container/${state.workingCopy._id}`, state.workingCopy, ContainerActions.saveDone)
        }

        return state
    }
})()

export const ContainerReducer = controller.reducer
