import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'

import { GraphQLService } from './graphql/graphql.service'
import { ValidationService } from './validation/validation.service'

const validator = new Validator()

export interface IWorkingCopy {
    readonly isDirty: false
    readonly validationErrors: Record<string, ValidationError[]> | null
}

const validationNameToken = new InjectionToken<string>('ValidationName')

const validationScopeToken = new InjectionToken<string>('ValidationScope')

const validationPropertiesToken = new InjectionToken<string>('ValidationProperties')

@Injectable()
export abstract class EditableService<T extends { _id: string }> implements OnDestroy {
    protected readonly ignoredFields = new Set(['_id', '__typename'])

    protected readonly _query = new BehaviorSubject<Record<string, T>>({})

    get map(): Observable<Record<string, T>> {
        return this._query
    }

    private readonly _edit = new BehaviorSubject<(id: string) => T & IWorkingCopy>((id) => this.createWorkingCopy(id))

    private readonly _inputValdations: Subscription

    private readonly _updateValidations: Subscription

    private _inputSchema: ValidationSchema = { $$strict: true }

    private _updateSchema: ValidationSchema = { $$strict: true }

    get editFactory(): Observable<(id: string) => T & IWorkingCopy> {
        return this._edit
    }

    protected readonly _itemQuery: string

    private readonly _addMutation: string

    private readonly _updateMutation: string

    private readonly _removeMutation: string

    constructor(
        protected readonly _gql: GraphQLService,
        @Inject(validationNameToken) validationName: string,
        @Inject(validationScopeToken) private readonly _validationScope: string,
        @Inject(validationPropertiesToken) validationProps: string,
        validation: ValidationService,
        protected readonly _router: Router
    ) {
        this._itemQuery = `
          query {
            ${_validationScope} {
                find(page: 1, pageSize: 1000) {
                  items { ${validationProps} }
                }
              }
            }`

        this._removeMutation = `
          mutation ($id: ID!){
            ${_validationScope} {
              delete(_id: $id) {
                ${validationProps}
              }
            }
          }`

        this._addMutation = `
          mutation ($data: ${validationName}Input!) {
            ${_validationScope} {
              add(data: $data) {
                ${validationProps}
              }
            }
          }`

        this._updateMutation = `
          mutation ($id: ID!, $data: ${validationName}Update!) {
            ${_validationScope} {
              update(_id: $id, data: $data) {
                ${validationProps}
              }
            }
          }`

        this._inputValdations = validation.inputValidations.subscribe((s) => {
            this._inputSchema = s[validationName]

            this.refresh()
        })

        this._updateValidations = validation.updateValidations.subscribe((s) => {
            this._updateSchema = s[validationName]

            this.refresh()
        })
    }

    protected createMap(items: T[]): Record<string, T> {
        return items.reduce((m: Record<string, T>, i: T) => ((m[i._id] = i), m), {})
    }

    protected fromServer(item: Partial<T>): Partial<T> {
        return item
    }

    protected toServer(item: Partial<T>): Partial<T> {
        return item
    }

    protected load(): void {
        this._gql.call(this._itemQuery, {}, (data) => {
            this._query.next(this.createMap(data[this._validationScope].find.items.map((i: T) => this.fromServer(i))))

            this.refresh()
        })
    }

    protected createNew(): Partial<T> {
        return {}
    }

    protected refresh(): void {
        this._edit.next((id) => this.createWorkingCopy(id))
    }

    private createWorkingCopy(id: string): T & IWorkingCopy {
        const item = JSON.parse(
            JSON.stringify(this._query.value[id] || this.createNew(), (key, value) =>
                this.ignoredFields.has(key) ? undefined : value
            )
        )

        const itemStr = JSON.stringify(item)

        const schema = (id ? this._updateSchema : this._inputSchema) || { $$strict: true }

        const createErrorMap = (): Record<string, ValidationError[]> | null => {
            const errors = validator.validate(item, schema) as ValidationError[] | true

            if (errors === true || errors.length < 1) {
                return null
            }

            const map: Record<string, ValidationError[]> = {}

            for (const error of errors) {
                const list = map[error.field]

                if (list) {
                    list.push(error)
                } else {
                    map[error.field] = [error]
                }
            }

            return map
        }

        let validationErrors = createErrorMap()
        let isDirty = false

        return new Proxy(item, {
            get(target, p) {
                switch (p) {
                    case 'validationErrors':
                        return validationErrors
                    case 'isDirty':
                        return isDirty
                    default:
                        return target[p]
                }
            },
            set(target, p, newValue): boolean {
                target[p] = newValue

                isDirty = JSON.stringify(target) !== itemStr
                validationErrors = createErrorMap()

                return true
            },
        }) as unknown as T & IWorkingCopy
    }

    protected afterAdd(added: T): void {
        this._router.navigate([this._validationScope, added._id], {
            replaceUrl: true,
        })

        this.load()
    }

    protected afterUpdate(_updated: T): void {
        this.load()
    }

    protected afterDelete(_deleted: T): void {
        this._router.navigate([this._validationScope], { replaceUrl: true })

        this.load()
    }

    addOrUpdate(id: string, data: Partial<T>): void {
        data = this.toServer(JSON.parse(JSON.stringify(data)))

        if (id) {
            this._gql.call(this._updateMutation, { data, id }, (res) =>
                this.afterUpdate(res[this._validationScope].update)
            )
        } else {
            this._gql.call(this._addMutation, { data, id }, (res) => this.afterAdd(res[this._validationScope].add))
        }
    }

    remove(id: string): void {
        this._gql.call(this._removeMutation, { id }, (res) => this.afterDelete(res[this._validationScope].delete))
    }

    ngOnDestroy(): void {
        this._inputValdations.unsubscribe()
        this._updateValidations.unsubscribe()

        this._edit.complete()
        this._query.complete()
    }
}
