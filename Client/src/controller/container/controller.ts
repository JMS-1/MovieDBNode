import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

import { validate } from '../../validation'

function validateContainer(state: local.IContainerState): local.IContainerState {
    if (!state.workingCopy || !state.validator) {
        return state
    }

    return { ...state, validation: validate(state.workingCopy, state.validator) }
}

export function getInitialState(): local.IContainerState {
    return {
        all: [],
        filter: '',
        selected: undefined,
        validation: undefined,
        validator: undefined,
        workingCopy: undefined,
    }
}

export function load(state: local.IContainerState, response: local.ILoadContainers): local.IContainerState {
    state = { ...state, all: response.containers || [] }

    if (!state.selected || state.workingCopy) {
        return state
    }

    return validateContainer({
        ...state,
        validation: undefined,
        workingCopy: state.all.find(c => c._id === state.selected),
    })
}

export function setFilter(state: local.IContainerState, request: local.ISetContainerTreeFilter): local.IContainerState {
    if (request.filter === state.filter) {
        return state
    }

    return { ...state, filter: request.filter }
}

export function startEdit(state: local.IContainerState, request: local.ISetContainerStartEdit): local.IContainerState {
    if (state.selected !== request.id) {
        state = { ...state, selected: request.id }
    }

    if (!request.id) {
        if (!state.workingCopy) {
            return state
        }

        return { ...state, workingCopy: undefined, validation: undefined }
    }

    if (state.workingCopy && state.workingCopy._id === request.id) {
        return state
    }

    return validateContainer({
        ...state,
        workingCopy: state.all.find(c => c._id === request.id),
        validation: undefined,
    })
}

export function setProperty<TProp extends keyof api.IContainer>(
    state: local.IContainerState,
    request: local.ISetContainerProperty<TProp>
): local.IContainerState {
    const workingCopy = state.workingCopy

    if (!workingCopy) {
        return state
    }

    if (workingCopy[request.prop] === request.value) {
        return state
    }

    return validateContainer({ ...state, workingCopy: { ...workingCopy, [request.prop]: request.value } })
}

export function loadSchema(state: local.IContainerState, response: local.ILoadSchemas): local.IContainerState {
    return validateContainer({ ...state, validator: response.schemas.container })
}
