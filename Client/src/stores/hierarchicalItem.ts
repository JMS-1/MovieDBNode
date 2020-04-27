import { computed } from 'mobx'
import { DropdownItemProps } from 'semantic-ui-react'

import { ItemStore } from './item'
import { createFiltered } from './utils'

export abstract class HierarchyItemStore<
    TItem extends { _id: string; parentId?: string; name: string }
> extends ItemStore<TItem> {
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

    private isPartOfFamily(child: TItem, id: string): boolean {
        if (!child) {
            return false
        }

        if (child._id === id) {
            return true
        }

        if (child.parentId === id) {
            return true
        }

        return this.isPartOfFamily(this._items[child.parentId], id)
    }

    getChildTree(id: string): string[] {
        return Object.keys(this._items).filter((i) => this.isPartOfFamily(this._items[i], id))
    }

    @computed({ keepAlive: true })
    get orderedAndFiltered(): string[] {
        return createFiltered(this._items, this.filter, this.getName.bind(this))
    }

    @computed
    get possibleParents(): DropdownItemProps[] {
        const forbidden = new Set<string>()

        if (this.workingCopy._id) {
            forbidden.add(this.workingCopy._id)
        }

        for (let check = new Set(forbidden); check.size > 0; ) {
            const children = new Set<string>(
                Object.keys(this._items).filter((id) => !forbidden.has(id) && forbidden.has(this._items[id].parentId))
            )

            check = children

            check.forEach((id) => forbidden.add(id))
        }

        return this.asOptions.filter((i) => !forbidden.has(i.value as string))
    }

    @computed({ keepAlive: true })
    get childTree(): Record<string, string[]> {
        const tree: Record<string, string[]> = {}

        Object.keys(this._items).forEach((id) => {
            const item = this._items[id]
            const parentId = item.parentId || ''

            const list = tree[parentId]

            if (list) {
                list.push(id)
            } else {
                tree[parentId] = [id]
            }
        })

        return tree
    }
}
