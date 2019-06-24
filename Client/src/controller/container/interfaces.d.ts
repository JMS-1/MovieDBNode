declare module 'movie-db-client' {
    import { Action } from 'redux'

    import { IContainer } from 'movie-db-api'

    interface IContainerState {
        readonly all: IContainer[]
    }

    const enum containerActions {
        load = 'movie-db.containers.load',
    }

    interface ILoadContainers extends Action {
        containers: IContainer[]
        type: containerActions.load
    }
}
