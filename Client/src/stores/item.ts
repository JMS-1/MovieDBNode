import { getMessage } from '@jms-1/isxs-tools'
import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { observable, action, computed } from 'mobx'
import { createViewModel, IViewModel } from 'mobx-utils'
import { DropdownItemProps } from 'semantic-ui-react'

import { RootStore } from './root'

const noSchema: ValidationSchema = { $$strict: true }

export abstract class BasicItemStore<TItem extends { _id: string }> {
    protected abstract readonly itemProps: string

    protected abstract readonly itemScope: string

    protected abstract readonly validationName: string

    protected abstract createNew(): TItem

    protected abstract toProtocol(item: TItem): Partial<TItem>

    @observable protected _items: Record<string, TItem> = {}

    @observable private _selected?: string = undefined

    constructor(public readonly root: RootStore) {}

    @action
    select(id: string): void {
        this._selected = id || ''
    }

    private getErrors(
        type: 'inputErrors' | 'updateErrors',
        field: string,
        index?: number,
        subField?: string
    ): ValidationError[] | null {
        const errors = this[type]

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

    getInputErrors(field: string, index?: number, subField?: string): ValidationError[] | null {
        return this.getErrors('inputErrors', field, index, subField)
    }

    getUpdateErrors(field: string, index?: number, subField?: string): ValidationError[] | null {
        return this.getErrors('updateErrors', field, index, subField)
    }

    @computed({ keepAlive: true })
    get selected(): TItem {
        return this._items[this._selected]
    }

    @computed({ keepAlive: true })
    get workingCopy(): TItem & IViewModel<TItem> {
        return createViewModel(this.selected || observable(this.createNew()))
    }

    private validate(schema: 'inputValidation' | 'updateValidation'): ValidationError[] | true {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const validator = new Validator()

        return validator.validate(this.toProtocol(this.workingCopy), this[schema])
    }

    @computed({ keepAlive: true })
    get inputErrors(): ValidationError[] | true {
        return this.validate('inputValidation')
    }

    @computed({ keepAlive: true })
    get updateErrors(): ValidationError[] | true {
        return this.validate('updateValidation')
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
            const query = gql`{ ${this.itemScope} { find { items { ${this.itemProps} } } } }`

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
            alert(getMessage(error))
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
