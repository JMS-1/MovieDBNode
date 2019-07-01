import { ITreeItem, ITreeStructure } from 'movie-db-client'

interface IItemInfo<TItem extends ITreeItem> {
    raw: TItem
}

interface IItemMap<TItem extends ITreeItem> {
    [id: string]: IItemInfo<TItem>
}

export function filterChildMap<TItem extends ITreeItem>(
    map: ITreeStructure,
    scope: string,
    filter: string,
    lookup: IItemMap<TItem>,
): void {
    // Das wird Bottom-Up gemacht
    const children = map[scope] || []

    for (let child of children) {
        filterChildMap(map, child, filter, lookup)
    }

    // Eventuell wurden Einträge entfernt.
    map[scope] = children.filter(c => map[c])

    // Aber wir haben noch Kinder, dann ist nichts zu tun.
    if (map[scope].length > 0) {
        return
    }

    // Wenn auch unser Name nicht zum Filter passt verschwinden wird.
    const self = lookup[scope]
    const name = self && self.raw.name && self.raw.name.toLocaleLowerCase()

    if (!name || name.indexOf(filter) < 0) {
        delete map[scope]
    }
}

export function sortChildMap<TItem extends ITreeItem>(map: ITreeStructure, lookup: IItemMap<TItem>): ITreeStructure {
    for (let children of Object.values(map)) {
        children.sort((l, r) => {
            const left = lookup[l]
            const right = lookup[r]

            return ((left && left.raw.name) || left.raw._id).localeCompare((right && right.raw.name) || right.raw._id)
        })
    }

    return map
}

export function createChildMap<TItem extends ITreeItem>(all: TItem[]): ITreeStructure {
    const map: ITreeStructure = {}

    for (let series of all) {
        const parentId = series.parentId || ''

        let parentInfo = map[parentId]

        if (!parentInfo) {
            map[parentId] = parentInfo = []
        }

        parentInfo.push(series._id)
    }

    return map
}
