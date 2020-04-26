import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { observable, action, computed } from 'mobx'
import { createViewModel, IViewModel } from 'mobx-utils'
import { DropdownItemProps } from 'semantic-ui-react'

import { RootStore } from './root'
import { routes } from './routes'
import { createFiltered } from './utils'

const noSchema: ValidationSchema = { $$strict: true }

export abstract class BasicItemStore<TItem extends { _id: string }> {
    abstract readonly itemProps: string

    abstract readonly itemScope: string

    abstract readonly itemRoute: routes

    protected abstract readonly validationName: string

    @observable protected _items: Record<string, TItem> = {}

    @observable private _selected?: string = ''

    @observable deleteConfirm = false

    @observable filter = ''

    constructor(public readonly root: RootStore) {}

    protected abstract createNew(): TItem

    protected abstract toProtocol(item: TItem, toSend?: boolean): Partial<TItem>

    @action
    select(id: string): void {
        this._selected = id === 'NEW' ? '' : id || ''
    }

    @action
    async remove(item?: TItem): Promise<void> {
        this.root.startRequest()

        const id = (item || this.workingCopy)._id

        try {
            const mutation = gql`mutation ($id: ID!){ ${this.itemScope} { delete(_id: $id) { _id } } }`

            await this.root.gql.mutate({ mutation, variables: { id } })

            delete this._items[id]

            this.deleteConfirm = false

            this.root.router.replace(this.itemRoute)
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    @action
    async addOrUpdate(item?: TItem): Promise<void> {
        if (!item) {
            item = this.workingCopy
        }

        this.root.startRequest()

        try {
            const res = await this.root.gql.mutate({
                mutation: item._id
                    ? gql`mutation ($id: ID!, $data: ${this.validationName}Update!){ ${this.itemScope} { update(_id: $id, data: $data) { ${this.itemProps} } } }`
                    : gql`mutation ($data: ${this.validationName}Input!){ ${this.itemScope} { add(data: $data) { ${this.itemProps} } } }`,
                variables: { data: this.toProtocol(item, true), id: item._id },
            })

            const changed: TItem = res.data[this.itemScope][item._id ? 'update' : 'add']

            this._items[changed._id] = changed

            if (!item._id) {
                this.root.router.replace(`${this.itemRoute}/${changed._id}`)
            }
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    getErrors(field: string, index?: number, subField?: string): string[] | null {
        const errors = this.errors

        if (errors === true) {
            return null
        }

        if (typeof index === 'number') {
            field += `[${index}]`
        }

        if (typeof subField === 'string') {
            field += `.${subField}`
        }

        const forField = errors.filter((e) => e.field === field)

        return forField.length > 0 ? forField.map((e) => e.message) : null
    }

    getItem(id: string): TItem | undefined {
        return this._items[id]
    }

    @computed({ keepAlive: true })
    get selected(): TItem {
        return this._items[this._selected]
    }

    @computed({ keepAlive: true })
    get workingCopy(): TItem & IViewModel<TItem> {
        return createViewModel(this.selected || observable(this.createNew()))
    }

    @computed({ keepAlive: true })
    get errors(): ValidationError[] | true {
        const validator = new Validator()

        return validator.validate(
            this.toProtocol(this.workingCopy),
            this.workingCopy._id ? this.updateValidation : this.inputValidation
        )
    }

    @computed({ keepAlive: true })
    get inputValidation(): ValidationSchema {
        return this.root.inputValidations[this.validationName] || noSchema
    }

    @computed({ keepAlive: true })
    get updateValidation(): ValidationSchema {
        return this.root.updateValidations[this.validationName] || noSchema
    }
}

export abstract class ItemStore<TItem extends { _id: string }> extends BasicItemStore<TItem> {
    abstract getName(item: TItem): string

    getFullName(item: TItem): string {
        return this.getName(item)
    }

    startup(): void {
        this.load()
    }

    @action
    private async load(): Promise<void> {
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

    @computed({ keepAlive: true })
    get ordered(): string[] {
        return Object.keys(this._items).sort((l, r) =>
            (this.getFullName(this._items[l]) || l).localeCompare(this.getFullName(this._items[r]) || r)
        )
    }

    @computed({ keepAlive: true })
    get asOptions(): DropdownItemProps[] {
        const items = this._items

        return this.ordered
            .map((id) => items[id])
            .filter((i) => i)
            .map((l) => ({ key: l._id, text: this.getFullName(l), value: l._id }))
    }
}

export abstract class HierarchyStore<TItem extends { _id: string; parentId?: string; name: string }> extends ItemStore<
    TItem
> {
    getFullName(item: TItem): string {
        const parentName = item?.parentId && this.getFullName(this._items[item.parentId])
        const myName = item?.name || item?._id

        return parentName ? `${parentName} > ${myName}` : myName
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
}
