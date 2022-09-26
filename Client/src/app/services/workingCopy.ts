/* eslint-disable @typescript-eslint/ban-types */

import { Inject, Injectable, InjectionToken, OnDestroy } from '@angular/core'
import Validator, { ValidationError, ValidationSchema } from 'fastest-validator'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'

import { ValidationService } from './validation/validation.service'

const validator = new Validator()

export interface IWorkingCopy {
    readonly isDirty: false
    readonly validationErrors: Record<string, ValidationError[]> | null
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ValidationNameToken = new InjectionToken<string>('ValidationName')

@Injectable()
export abstract class EditableService<T extends object> implements OnDestroy {
    private readonly _edit = new BehaviorSubject<(id: string) => T & IWorkingCopy>((id) => this.createWorkingCopy(id))

    private readonly _inputValdations: Subscription

    private readonly _updateValidations: Subscription

    private _inputSchema: ValidationSchema = { $$strict: true }

    private _updateSchema: ValidationSchema = { $$strict: true }

    get editFactory(): Observable<(id: string) => T & IWorkingCopy> {
        return this._edit
    }

    constructor(@Inject(ValidationNameToken) private readonly _validationName: string, validation: ValidationService) {
        this._inputValdations = validation.inputValidations.subscribe((s) => {
            this._inputSchema = s[this._validationName]

            this.refresh()
        })

        this._updateValidations = validation.updateValidations.subscribe((s) => {
            this._updateSchema = s[this._validationName]

            this.refresh()
        })
    }

    protected abstract getCurrentMap(): Record<string, T>

    protected createNew(): Partial<T> {
        return {}
    }

    protected refresh(): void {
        this._edit.next((id) => this.createWorkingCopy(id))
    }

    private createWorkingCopy(id: string): T & IWorkingCopy {
        const item = JSON.parse(JSON.stringify(this.getCurrentMap()[id] || this.createNew()))

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

    ngOnDestroy(): void {
        this._inputValdations.unsubscribe()
        this._updateValidations.unsubscribe()

        this._edit.complete()
    }
}
