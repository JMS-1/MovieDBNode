import { IContainerResponse } from 'movie-db-api'
import { containerActions, ILoadContainers, ISetContainerTreeFilter } from 'movie-db-client'

export class ContainerActions {
    static load(response: IContainerResponse): ILoadContainers {
        return { containers: response.containers, type: containerActions.load }
    }

    static setFilter(filter: string): ISetContainerTreeFilter {
        return { filter, type: containerActions.filter }
    }
}
