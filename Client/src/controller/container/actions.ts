import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class ContainerActions {
    static load(response: api.IContainerResponse): local.ILoadContainers {
        return { containers: response.containers, type: local.containerActions.load }
    }

    static setFilter(filter: string): local.ISetContainerTreeFilter {
        return { filter, type: local.containerActions.filter }
    }

    static startEdit(id: string): local.ISetContainerStartEdit {
        return { id, type: local.containerActions.setEdit }
    }

    static setProperty<TProp extends keyof api.IContainer>(
        prop: TProp,
        value: api.IContainer[TProp],
    ): local.ISetContainerProperty<TProp> {
        return { prop, value, type: local.containerActions.setProp }
    }
}
