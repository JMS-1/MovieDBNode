import { IValidationError } from 'movie-db-api'
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
    // Wenn unser eigener Name passt, dann bleiben auch alle Kinder  drin.
    const self = lookup[scope]
    const name = self && self.raw.name && self.raw.name.toLocaleLowerCase()

    if (name && name.indexOf(filter) >= 0) {
        return
    }

    // Das wird Bottom-Up gemacht
    const children = map[scope] || []

    for (let child of children) {
        filterChildMap(map, child, filter, lookup)
    }

    // Eventuell wurden Einträge entfernt.
    map[scope] = children.filter(c => map[c])

    // Wenn wir keine passenden Kinder haben müssen auch wir weg.
    if (map[scope].length < 1) {
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

export function createChildMap<TItem extends ITreeItem>(items: TItem[]): ITreeStructure {
    const map: ITreeStructure = {}

    for (let item of items) {
        if (!map[item._id]) {
            map[item._id] = []
        }

        const parentId = item.parentId || ''

        let parentInfo = map[parentId]

        if (!parentInfo) {
            map[parentId] = parentInfo = []
        }

        parentInfo.push(item._id)
    }

    return map
}

export function getErrors(errors: IValidationError[], expr: RegExp): string[] {
    const list = errors && errors.filter(e => e.property.match(expr))

    return list && list.length > 0 && list.map(e => `${e.message} (${e.constraint})`)
}
