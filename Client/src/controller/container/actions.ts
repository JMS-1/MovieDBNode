import { IContainer } from 'movie-db-api'
import { containerActions, ILoadContainers } from 'movie-db-client'

export class ContainerActions {
    static load(containers: IContainer[]): ILoadContainers {
        return { containers, type: containerActions.load }
    }
}
