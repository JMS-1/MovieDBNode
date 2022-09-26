import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import { DocumentNode } from 'graphql'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'

import { ErrorService } from './error/error.service'
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
    private readonly _query = new BehaviorSubject<Record<string, T>>({})

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

    protected readonly _itemQuery: DocumentNode

    private readonly _addMutation: DocumentNode

    private readonly _updateMutation: DocumentNode

    private readonly _removeMutation: DocumentNode

    constructor(
        protected readonly _gql: Apollo,
        @Inject(validationNameToken) validationName: string,
        @Inject(validationScopeToken) private readonly _validationScope: string,
        @Inject(validationPropertiesToken) validationProps: string,
        validation: ValidationService,
        protected readonly _router: Router,
        protected readonly _errors: ErrorService
    ) {
        this._itemQuery = gql`
          query {
            ${_validationScope} {
                find(page: 1, pageSize: 1000) {
                  items { ${validationProps} }
                }
              }
            }`

        this._removeMutation = gql`
          mutation ($id: ID!){
            ${_validationScope} {
              delete(_id: $id) {
                ${validationProps}
              }
            }
          }`

        this._addMutation = gql`
          mutation ($data: ${validationName}Input!) {
            ${_validationScope} {
              add(data: $data) {
                ${validationProps}
              }
            }
          }`

        this._updateMutation = gql`
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

    protected load(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this._errors.serverCall(this._gql.query({ query: this._itemQuery }), (data: any) => {
            this._query.next(this.createMap(data[this._validationScope].find.items))

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
        const item = JSON.parse(JSON.stringify(this._query.value[id] || this.createNew()))

        delete item._id
        delete item.__typename

        const itemStr = JSON.parse(JSON.stringify(item))

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

                isDirty = JSON.parse(JSON.stringify(target)) !== itemStr
                validationErrors = createErrorMap()

                return true
            },
        }) as unknown as T & IWorkingCopy
    }

    addOrUpdate(id: string, data: Partial<T>): void {
        if (id) {
            this._errors.serverCall(this._gql.query({ query: this._updateMutation, variables: { data, id } }), () =>
                this.load()
            )
        } else {
            this._errors.serverCall(
                this._gql.query({ query: this._addMutation, variables: { data, id } }),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (res: any) => {
                    this._router.navigate([this._validationScope, res[this._validationScope].add._id], {
                        replaceUrl: true,
                    })

                    this.load()
                }
            )
        }
    }

    remove(id: string): void {
        this._errors.serverCall(this._gql.query({ query: this._removeMutation, variables: { id } }), () => {
            this._router.navigate([this._validationScope], { replaceUrl: true })

            this.load()
        })
    }

    ngOnDestroy(): void {
        this._inputValdations.unsubscribe()
        this._updateValidations.unsubscribe()

        this._edit.complete()
        this._query.complete()
    }
}
