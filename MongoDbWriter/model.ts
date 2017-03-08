import * as legacy from "./LegacyContract";

export var containerCollection = "containers";

export interface IContainer {
    _id: number;

    name: string;

    type: number;

    description?: string;

    parentId?: number;

    location?: string;
}

var _containerId = 0;

function migrateContainer(old: legacy.IContainer): IContainer {
    return {
        parentId: null,
        name: old.Name,
        type: old.Type,
        _id: ++_containerId,
        location: old.ParentLocation || null,
        description: old.Description || null
    };
}

export function migrateContainers(old: legacy.IContainer[]): IContainer[] {
    var containers = [];

    var idMap: { [id: string]: IContainer; } = {};
    var parentMap: { [id: string]: string; } = {};

    if (old)
        for (var oldContainer of old) {
            var container = migrateContainer(oldContainer);

            idMap[oldContainer.Id] = container;

            if (oldContainer.Parent)
                parentMap[oldContainer.Id] = oldContainer.Parent;

            containers.push(container);
        }

    for (var id in parentMap)
        if (parentMap.hasOwnProperty(id))
            idMap[id].parentId = idMap[parentMap[id]]._id;

    return containers;
}
