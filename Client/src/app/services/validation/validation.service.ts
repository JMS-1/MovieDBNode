import { Injectable, OnDestroy } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { ValidationSchema } from 'fastest-validator'
import { BehaviorSubject, Observable } from 'rxjs'

import { ErrorService } from '../error/error.service'

interface IValidation {
    input: string
    name: string
    update: string
}

const queryValidations = gql<{ validation: IValidation[] }, EmptyObject>(`
  query {
    validation {
      name input update
    }
  }
`)

@Injectable()
export class ValidationService implements OnDestroy {
    private readonly _inputValidations = new BehaviorSubject<Record<string, ValidationSchema>>({})

    private readonly _updateValidations = new BehaviorSubject<Record<string, ValidationSchema>>({})

    get inputValidations(): Observable<Record<string, ValidationSchema>> {
        return this._inputValidations
    }

    get updateValidations(): Observable<Record<string, ValidationSchema>> {
        return this._updateValidations
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._errors.serverCall(this._gql.query({ query: queryValidations }), (data) => {
            const inputValidations: Record<string, ValidationSchema> = {}
            const updateValidations: Record<string, ValidationSchema> = {}

            for (const validation of data.validation) {
                inputValidations[validation.name] = JSON.parse(validation.input)
                updateValidations[validation.name] = JSON.parse(validation.update)
            }

            this._inputValidations.next(inputValidations)
            this._updateValidations.next(updateValidations)
        })
    }

    ngOnDestroy(): void {
        this._inputValidations.complete()
        this._updateValidations.complete()
    }
}
