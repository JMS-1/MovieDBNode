interface IFilterNode {
    readonly _id: string
    readonly parentId?: string
}

export function createFiltered<TItem extends IFilterNode>(
    items: Record<string, TItem>,
    filter: string,
    getName: (item: TItem) => string
): string[] {
    filter = (filter || '').toLowerCase()

    /** Direkte Treffer auf den aktuellen Filter. */
    const direct = new Set(
        Object.keys(items).filter((id) => !filter || getName(items[id]).toLowerCase().indexOf(filter) >= 0)
    )

    /** Bottom-up - ist ein Knoten im Filter, dann ist es auch der übergeordnete. */
    const filtered = new Set(direct)

    for (let nodes = filtered; nodes.size > 0; ) {
        const parents = new Set<string>()

        nodes.forEach((id) => {
            const parentId = items[id].parentId

            if (parentId && !filtered.has(parentId)) {
                parents.add(parentId)
            }
        })

        nodes = parents

        nodes.forEach((id) => filtered.add(id))
    }

    /** Top-down - ist ein Knoten im Filter, dann sind es auch alle untergeordneten. */
    for (let nodes = direct; nodes.size > 0; ) {
        const children = new Set<string>()

        Object.keys(items).forEach((id) => {
            if (!direct.has(id)) {
                const parentId = items[id].parentId

                if (parentId && direct.has(parentId)) {
                    children.add(id)
                }
            }
        })

        nodes = children

        children.forEach((id) => direct.add(id))
    }

    direct.forEach((id) => filtered.add(id))

    return Array.from(filtered).sort((l, r) => (getName(items[l]) || l).localeCompare(getName(items[r]) || r))
}
