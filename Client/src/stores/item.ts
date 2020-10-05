import gql from 'graphql-tag'
import { action, computed, makeObservable } from 'mobx'
import { DropdownItemProps } from 'semantic-ui-react'

import { RootStore } from '.'
import { BasicItemStore } from './basicItem'

export abstract class ItemStore<TItem extends { _id: string }> extends BasicItemStore<TItem> {
    constructor(root: RootStore) {
        super(root)

        makeObservable(this, {
            asOptions: computed({ keepAlive: true }),
            ordered: computed({ keepAlive: true }),
        })
    }

    abstract getName(item: TItem): string

    getFullName(item: TItem): string {
        return this.getName(item)
    }

    startup(): void {
        this.load()
    }

    @action
    protected async load(): Promise<void> {
        this.root.startRequest()

        try {
            const query = gql`{ ${this.itemScope} { find(page: 1, pageSize: 1000) { items { ${this.itemProps} } } } }`

            const res = await this.root.gql.query({ query })
            const all: TItem[] = res.data[this.itemScope].find.items || []

            const items: Record<string, TItem> = {}

            for (const item of all || []) {
                items[item._id] = item
            }

            this._items = items

            if (!this.selected && this.ordered.length > 0) {
                this.select(this.ordered[0] || '')
            }
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    get ordered(): string[] {
        return Object.keys(this._items).sort((l, r) =>
            (this.getFullName(this._items[l]) || l).localeCompare(this.getFullName(this._items[r]) || r)
        )
    }

    get asOptions(): DropdownItemProps[] {
        const items = this._items

        return this.ordered
            .map((id) => items[id])
            .filter((i) => i)
            .map((l) => ({ key: l._id, text: this.getFullName(l), value: l._id }))
    }
}
