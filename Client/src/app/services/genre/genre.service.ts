import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IGenre } from 'api'
import { Apollo } from 'apollo-angular'

import { EditableService } from '../edit.service'
import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'

@Injectable()
export class GenreService extends EditableService<IGenre> {
    constructor(gql: Apollo, validation: ValidationService, router: Router, errors: ErrorService) {
        super(gql, 'Genre', 'genres', '_id name', validation, router, errors)

        this.load()
    }
}
