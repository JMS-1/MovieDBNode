import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { action, computed, makeObservable, observable } from 'mobx'
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
            addOrUpdate: action,
            afterAddOrUpdate: action,
            afterRemove: action,
            deleteConfirm: observable,
            errors: computed({ keepAlive: true }),
            filter: observable,
            inputValidation: computed({ keepAlive: true }),
            remove: action,
            select: action,
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

    select(id: string | undefined): void {
        this._selected = id === 'NEW' ? '' : id || ''
    }

    afterRemove(id: string): void {
        this.afterDelete(id)

        this.deleteConfirm = false

        window.location.href = `#${this.itemRoute}`
    }

    async remove(item?: TItem): Promise<void> {
        this.root.startRequest()

        const id = (item || this.workingCopy)._id

        try {
            const mutation = gql`mutation ($id: ID!){ ${this.itemScope} { delete(_id: $id) { _id } } }`

            await this.root.gql.mutate({ mutation, variables: { id } })

            this.afterRemove(id)
        } catch (error) {
            this.root.requestFailed(error)
        } finally {
            this.root.doneRequest()
        }
    }

    afterAddOrUpdate(changed: TItem, added: boolean): void {
        this._items[changed._id] = changed

        if (added) {
            window.location.href = `#${this.itemRoute}/${changed._id}`
        }
    }

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

            this.afterAddOrUpdate(res.data[this.itemScope][item._id ? 'update' : 'add'], !item._id)
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

        return forField.length > 0 ? forField.map((e) => e.message || 'unknown') : null
    }

    getItem(id: string): TItem | undefined {
        return this._items[id]
    }

    get selected(): TItem | undefined {
        return this._selected ? this._items[this._selected] : undefined
    }

    get workingCopy(): TItem & IViewModel<TItem> {
        return createViewModel(this.selected || observable(this.createNew()))
    }

    get errors(): ValidationError[] | true {
        const validator = new Validator()

        return validator.validate(
            this.toProtocol(this.workingCopy),
            this.workingCopy._id ? this.updateValidation : this.inputValidation
        ) as ValidationError[] | true
    }

    get inputValidation(): ValidationSchema {
        return this.root.inputValidations[this.validationName] || noSchema
    }

    get updateValidation(): ValidationSchema {
        return this.root.updateValidations[this.validationName] || noSchema
    }
}
