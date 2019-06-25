declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { IContainer } from 'movie-db-api'

    interface IContainerState {
        readonly all: IContainer[]
        readonly filter: string
    }

    const enum containerActions {
        filter = 'movie-db.containers.set-filter',
        load = 'movie-db.containers.load',
    }

    interface ILoadContainers extends Action {
        containers: IContainer[]
        type: containerActions.load
    }

    interface ISetContainerTreeFilter extends Action {
        filter: string
        type: containerActions.filter
    }
}
