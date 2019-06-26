import * as api from 'movie-db-api'
import * as local from 'movie-db-client'

export class ContainerActions {
    static load(response: api.IContainerResponse): local.ILoadContainers {
        return { list: response.containers, type: local.containerActions.load }
    }

    static setFilter(filter: string): local.ISetContainerTreeFilter {
        return { filter, type: local.containerActions.filter }
    }

    static select(id: string): local.ISelectContainer {
        return { id, type: local.containerActions.select }
    }

    static setProperty<TProp extends keyof api.IContainer>(
        prop: TProp,
        value: api.IContainer[TProp]
    ): local.ISetContainerProperty<TProp> {
        return { prop, value, type: local.containerActions.setProp }
    }

    static saveDone(response: api.IUpdateContainerResponse): local.IContainerSaved {
        return { item: response.container, errors: response.errors, type: local.containerActions.saveDone }
    }

    static cancelEdit(): local.ICancelContainerEdit {
        return { type: local.containerActions.cancel }
    }

    static save(): local.ISaveContainer {
        return { type: local.containerActions.save }
    }
}
