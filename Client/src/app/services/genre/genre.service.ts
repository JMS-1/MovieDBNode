import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { IGenre } from '../../../api'
import { EditableService } from '../edit.service'
import { GraphQLService } from '../graphql/graphql.service'
import { ValidationService } from '../validation/validation.service'

@Injectable()
export class GenreService extends EditableService<IGenre> {
    constructor(gql: GraphQLService, validation: ValidationService, router: Router) {
        super(gql, 'Genre', 'genres', '_id name', validation, router)

        this.load()
    }
}
