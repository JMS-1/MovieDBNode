import * as local from 'movie-db-client'

import * as controller from './controller'

export * from './actions'
export * from './selectors'

type IAction =
    | local.IContainerSaved
    | local.IContainerSelect
    | local.ILoadContainers
    | local.ILoadSchemas
    | local.ISetContainerProperty<any>
    | local.ISetContainerTreeFilter

export function ContainerReducer(state: local.IContainerState, action: IAction): local.IContainerState {
    if (!state) {
        state = controller.getInitialState()
    }

    switch (action.type) {
        case local.containerActions.load:
            return controller.load(state, action)
        case local.containerActions.filter:
            return controller.setFilter(state, action)
        case local.containerActions.select:
            return controller.select(state, action)
        case local.containerActions.setProp:
            return controller.setProperty(state, action)
        case local.containerActions.save:
            return controller.saveDone(state, action)
        case local.applicationActions.loadSchema:
            return controller.loadSchema(state, action)
    }

    return state
}
