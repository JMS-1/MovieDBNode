import { getMessage } from '@jms-1/isxs-tools'
import { ValidationSchema } from 'fastest-validator'
import gql from 'graphql-tag'
import { observable, action, computed } from 'mobx'

import { RootStore } from './root'

const noSchema: ValidationSchema = { $$strict: true }

export abstract class BasicItemStore<TItem extends { _id: string }> {
    protected abstract readonly itemProps: string

    protected abstract readonly itemScope: string

    protected abstract readonly validationName: string

    @observable protected _items: Record<string, TItem> = {}

    constructor(public readonly root: RootStore) {}

    @computed({ keepAlive: true }) get inputValidation(): ValidationSchema {
        return this.root.inputValidations[this.validationName] || noSchema
    }

    @computed({ keepAlive: true }) get updateValidation(): ValidationSchema {
        return this.root.updateValidations[this.validationName] || noSchema
    }
}

export abstract class ItemStore<TItem extends { _id: string }> extends BasicItemStore<TItem> {
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
        } catch (error) {
            alert(getMessage(error))
        } finally {
            this.root.outstandingRequests -= 1
        }
    }
}
