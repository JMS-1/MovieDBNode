import { computed, makeObservable } from 'mobx'
import { DropdownItemProps } from 'semantic-ui-react'

import { RootStore } from '.'
import { ItemStore } from './item'
import { createFiltered } from './utils'

export abstract class HierarchyItemStore<
    TItem extends { _id: string; parentId?: string; name: string }
> extends ItemStore<TItem> {
    constructor(root: RootStore) {
        super(root)

        makeObservable(this, {
            childTree: computed({ keepAlive: true }),
            orderedAndFiltered: computed({ keepAlive: true }),
            possibleParents: computed,
        })
    }

    getFullName(item: TItem): string {
        const parentName = item?.parentId && this.getFullName(this._items[item.parentId])
        const myName = item?.name || item?._id

        return parentName ? `${parentName} > ${myName}` : myName
    }

    protected afterDelete(id: string): void {
        if (Object.keys(this._items).some((i) => this._items[i].parentId === id)) {
            this.load()
        } else {
            super.afterDelete(id)
        }
    }

    private isPartOfFamily(child: TItem | undefined, id: string): boolean {
        if (!child) {
            return false
        }

        if (child._id === id) {
            return true
        }

        if (child.parentId === id) {
            return true
        }

        return this.isPartOfFamily(child.parentId ? this._items[child.parentId] : undefined, id)
    }

    getChildTree(id: string): string[] {
        return Object.keys(this._items).filter((i) => this.isPartOfFamily(this._items[i], id))
    }

    get orderedAndFiltered(): string[] {
        return createFiltered(this._items, this.filter, this.getName.bind(this))
    }

    get possibleParents(): DropdownItemProps[] {
        const forbidden = new Set<string>()

        if (this.workingCopy._id) {
            forbidden.add(this.workingCopy._id)
        }

        for (let check = new Set(forbidden); check.size > 0; ) {
            const children = new Set<string>(
                Object.keys(this._items).filter(
                    (id) => !forbidden.has(id) && forbidden.has(this._items[id].parentId || '')
                )
            )

            check = children

            check.forEach((id) => forbidden.add(id))
        }

        return this.asOptions.filter((i) => !forbidden.has(i.value as string))
    }

    get childTree(): Record<string, Set<string>> {
        const tree: Record<string, Set<string>> = {}

        Object.keys(this._items).forEach((id) => {
            const item = this._items[id]
            const parentId = item.parentId || ''

            const list = tree[parentId]

            if (list) {
                list.add(id)
            } else {
                tree[parentId] = new Set([id])
            }
        })

        return tree
    }
}
