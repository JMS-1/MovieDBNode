import { Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { ValidationSchema } from 'fastest-validator'

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
export class ValidationService {
    inputValidations: Record<string, ValidationSchema> = {}

    updateValidations: Record<string, ValidationSchema> = {}

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._errors.serverCall(this._gql.query({ query: queryValidations }), (data) => {
            for (const validation of data.validation) {
                this.inputValidations[validation.name] = JSON.parse(validation.input)
                this.updateValidations[validation.name] = JSON.parse(validation.update)
            }
        })
    }
}
