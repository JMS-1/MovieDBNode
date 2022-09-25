/* eslint-disable @typescript-eslint/ban-types */

import { Injectable, OnDestroy } from '@angular/core'
import { ValidationError } from 'apollo-server-express'
import Validator, { ValidationSchema } from 'fastest-validator'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'

import { ValidationService } from './validation/validation.service'

const validator = new Validator()

export interface IWorkingCopy<T extends object> {
    readonly validationErrors: ValidationError[] | true
}

@Injectable()
export abstract class EditableService<T extends object> implements OnDestroy {
    protected abstract validationName: string

    private readonly _edit = new BehaviorSubject<(id: string) => T & IWorkingCopy<T>>((id) =>
        this.createWorkingCopy(id)
    )

    private readonly _inputValdations: Subscription

    private readonly _updateValidations: Subscription

    private _inputSchema: ValidationSchema = { $$strict: true }

    private _updateSchema: ValidationSchema = { $$strict: true }

    get editFactory(): Observable<(id: string) => T & IWorkingCopy<T>> {
        return this._edit
    }

    constructor(validation: ValidationService) {
        this._inputValdations = validation.inputValidations.subscribe((s) => {
            this._inputSchema = s[this.validationName]

            this.refresh()
        })

        this._updateValidations = validation.updateValidations.subscribe((s) => {
            this._updateSchema = s[this.validationName]

            this.refresh()
        })
    }

    protected abstract getCurrentMap(): Record<string, T>

    protected refresh(): void {
        this._edit.next((id) => this.createWorkingCopy(id))
    }

    private createWorkingCopy(id: string): T & IWorkingCopy<T> {
        const item = JSON.parse(JSON.stringify(this.getCurrentMap()[id] || {}))

        delete item._id
        delete item.__typename

        const schema = (id ? this._updateSchema : this._inputSchema) || { $$strict: true }

        let validationErrors = validator.validate(item, schema)

        return new Proxy(item, {
            get(target, p) {
                switch (p) {
                    case 'validationErrors':
                        return validationErrors
                    default:
                        return target[p]
                }
            },
            set(target, p, newValue): boolean {
                target[p] = newValue

                validationErrors = validator.validate(item, schema)

                return true
            },
        }) as unknown as T & IWorkingCopy<T>
    }

    ngOnDestroy(): void {
        this._inputValdations.unsubscribe()
        this._updateValidations.unsubscribe()

        this._edit.complete()
    }
}
