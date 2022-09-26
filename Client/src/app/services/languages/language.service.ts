import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular'

import { ILanguage } from '../../../api'
import { EditableService } from '../edit.service'
import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'

@Injectable()
export class LanguageService extends EditableService<ILanguage> {
    constructor(gql: Apollo, validation: ValidationService, router: Router, errors: ErrorService) {
        super(gql, 'Language', 'languages', '_id name', validation, router, errors)

        this.load()
    }
}
