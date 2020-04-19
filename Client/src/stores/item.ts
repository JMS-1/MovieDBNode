import { routerActions } from 'connected-react-router'
import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { observable, action, computed } from 'mobx'
import { createViewModel, IViewModel } from 'mobx-utils'
import { DropdownItemProps } from 'semantic-ui-react'

import { RootStore } from './root'
import { routes } from './routes'
import { getGraphQlError } from './utils'

import { delayedDispatch } from '../store'

const noSchema: ValidationSchema = { $$strict: true }

export abstract class BasicItemStore<TItem extends { _id: string }> {
    protected abstract readonly itemProps: string

    protected abstract readonly itemScope: string

    abstract readonly itemRoute: routes

    protected abstract readonly validationName: string

    protected abstract createNew(): TItem

    protected abstract toProtocol(item: TItem): Partial<TItem>

    @observable protected _items: Record<string, TItem> = {}

    @observable private _selected?: string = undefined

    @observable deleteConfirm = false

    @observable filter = ''

    constructor(public readonly root: RootStore) {}

    @action
    select(id: string): void {
        this._selected = id === 'NEW' ? '' : id || ''
    }

    @action
    async remove(item?: TItem): Promise<void> {
        this.root.outstandingRequests += 1

        const id = (item || this.workingCopy)._id

        try {
            const mutation = gql`mutation ($id: ID!){ ${this.itemScope} { delete(_id: $id) { _id } } }`

            await this.root.gql.mutate({ mutation, variables: { id } })

            delete this._items[id]

            this.deleteConfirm = false

            delayedDispatch(routerActions.replace(this.itemRoute))
        } catch (error) {
            alert(getGraphQlError(error))
        } finally {
            this.root.outstandingRequests -= 1
        }
    }

    @action
    async addOrUpdate(item?: TItem): Promise<void> {
        if (!item) {
            item = this.workingCopy
        }

        this.root.outstandingRequests += 1

        try {
            const res = await this.root.gql.mutate({
                mutation: item._id
                    ? gql`mutation ($id: ID!, $data: ${this.validationName}Update!){ ${this.itemScope} { update(_id: $id, data: $data) { ${this.itemProps} } } }`
                    : gql`mutation ($data: ${this.validationName}Input!){ ${this.itemScope} { add(data: $data) { ${this.itemProps} } } }`,
                variables: { data: this.toProtocol(item), id: item._id },
            })

            const changed: TItem = res.data[this.itemScope][item._id ? 'update' : 'add']

            this._items[changed._id] = changed

            if (!item._id) {
                delayedDispatch(routerActions.replace(`${this.itemRoute}/${changed._id}`))
            }
        } catch (error) {
            alert(getGraphQlError(error))
        } finally {
            this.root.outstandingRequests -= 1
        }
    }

    getErrors(field: string, index?: number, subField?: string): ValidationError[] | null {
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

        return forField.length < 1 ? null : forField
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

    startup(): void {
        this.load()
    }

    @action
    private async load(): Promise<void> {
        this.root.outstandingRequests += 1

        try {
            const query = gql`{ ${this.itemScope} { find(page: 1, pageSize: 1000) { items { ${this.itemProps} } } } }`

            const res = await this.root.gql.query({ query })
            const all: TItem[] = res.data[this.itemScope].find.items || []

            const items: Record<string, TItem> = {}

            for (const item of all || []) {
                items[item._id] = item
            }

            this._items = items

            if (!this.selected) {
                this.select(this.ordered[0] || '')
            }
        } catch (error) {
            alert(getGraphQlError(error))
        } finally {
            this.root.outstandingRequests -= 1
        }
    }

    @computed({ keepAlive: true })
    get ordered(): string[] {
        return Object.keys(this._items).sort((l, r) =>
            (this.getName(this._items[l]) || l).localeCompare(this.getName(this._items[r]) || r)
        )
    }

    @computed({ keepAlive: true })
    get asOptions(): DropdownItemProps[] {
        const items = this._items

        return this.ordered
            .map((id) => items[id])
            .filter((i) => i)
            .map((l) => ({ key: l._id, text: this.getName(l), value: l._id }))
    }
}
