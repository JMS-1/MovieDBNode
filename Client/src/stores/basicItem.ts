import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { observable, action, computed, makeObservable } from 'mobx'
import { createViewModel, IViewModel } from 'mobx-utils'

import { RootStore } from './root'
import { routes } from './routes'

const noSchema: ValidationSchema = { $$strict: true }

export abstract class BasicItemStore<TItem extends { _id: string }> {
    abstract readonly itemProps: string

    abstract readonly itemScope: string

    abstract readonly itemRoute: routes

    protected abstract readonly validationName: string

    _items: Record<string, TItem> = {}

    _selected?: string = ''

    deleteConfirm = false

    filter = ''

    constructor(public readonly root: RootStore) {
        makeObservable(this, {
            _items: observable,
            _selected: observable,
            deleteConfirm: observable,
            errors: computed({ keepAlive: true }),
            filter: observable,
            inputValidation: computed({ keepAlive: true }),
            selected: computed({ keepAlive: true }),
            updateValidation: computed({ keepAlive: true }),
            workingCopy: computed({ keepAlive: true }),
        })
    }

    protected abstract createNew(): TItem

    protected abstract toProtocol(item: TItem, toSend?: boolean): Partial<TItem>

    protected afterDelete(id: string): void {
        delete this._items[id]
    }

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

            this.afterDelete(id)

            this.deleteConfirm = false

            this.root.router.replace(this.itemRoute)
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    @action
    async addOrUpdate(item?: TItem): Promise<boolean> {
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

            return false
        } finally {
            this.root.doneRequest()
        }

        return true
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

    get selected(): TItem {
        return this._items[this._selected]
    }

    get workingCopy(): TItem & IViewModel<TItem> {
        return createViewModel(this.selected || observable(this.createNew()))
    }

    get errors(): ValidationError[] | true {
        const validator = new Validator()

        return validator.validate(
            this.toProtocol(this.workingCopy),
            this.workingCopy._id ? this.updateValidation : this.inputValidation
        )
    }

    get inputValidation(): ValidationSchema {
        return this.root.inputValidations[this.validationName] || noSchema
    }

    get updateValidation(): ValidationSchema {
        return this.root.updateValidations[this.validationName] || noSchema
    }
}
