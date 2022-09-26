import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { IGenre, IGenreFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { BehaviorSubject, Observable } from 'rxjs'

import { ErrorService } from '../error/error.service'
import { ValidationService } from '../validation/validation.service'
import { EditableService } from '../workingCopy'

const props = '_id name'

const queryGenres = gql<{ genres: { find: IGenreFindResult } }, EmptyObject>(`
  query {
    genres {
        find(page: 1, pageSize: 1000) {
          items { ${props} }
        }
      }
    }
`)

const addGenre = gql<{ genres: { add: IGenre } }, EmptyObject>(`
  mutation ($data: GenreInput!) {
    genres {
      add(data: $data) {
        ${props}
      }
    }
  }
`)

const updGenre = gql<{ genres: { update: IGenre } }, EmptyObject>(`
  mutation ($id: ID!, $data: GenreUpdate!) {
    genres {
      update(_id: $id, data: $data) {
        ${props}
      }
    }
  }
`)

const delGenre = gql<{ genres: { delete: IGenre } }, EmptyObject>(`
  mutation ($id: ID!){
    genres {
      delete(_id: $id) {
        ${props}
      }
    }
  }
`)

@Injectable()
export class GenreService extends EditableService<IGenre> {
    private readonly _query = new BehaviorSubject<Record<string, IGenre>>({})

    get map(): Observable<Record<string, IGenre>> {
        return this._query
    }

    protected getCurrentMap(): Record<string, IGenre> {
        return this._query.value
    }

    constructor(
        private readonly _gql: Apollo,
        validation: ValidationService,
        private readonly _router: Router,
        private readonly _errors: ErrorService
    ) {
        super('Genre', validation)

        this.load()
    }

    private load(): void {
        this._errors.serverCall(this._gql.query({ query: queryGenres }), (data) => {
            this._query?.next(
                data.genres.find.items.reduce((m, g) => ((m[g._id] = g), m), {} as Record<string, IGenre>)
            )

            super.refresh()
        })
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this._query.complete()
    }

    addOrUpdate(id: string, data: Omit<IGenre, '_id'>): void {
        if (id) {
            this._errors.serverCall(this._gql.query({ query: updGenre, variables: { data, id } }), (l) => this.load())
        } else {
            this._errors.serverCall(this._gql.query({ query: addGenre, variables: { data, id } }), (l) => {
                this._router.navigate(['genre', l.genres.add._id], { replaceUrl: true })

                this.load()
            })
        }
    }

    remove(id: string): void {
        this._errors.serverCall(this._gql.query({ query: delGenre, variables: { id } }), () => {
            this._router.navigate(['genre'], { replaceUrl: true })

            this.load()
        })
    }
}
