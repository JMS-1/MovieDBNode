import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { ILanguage } from '../../../api'
import { EditableService } from '../edit.service'
import { GraphQLService } from '../graphql/graphql.service'
import { ValidationService } from '../validation/validation.service'

@Injectable()
export class LanguageService extends EditableService<ILanguage> {
    constructor(gql: GraphQLService, validation: ValidationService, router: Router) {
        super(gql, 'Language', 'languages', '_id name', validation, router)

        this.load()
    }
}
