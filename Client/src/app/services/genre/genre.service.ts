import { Injectable, OnDestroy } from '@angular/core'
import { IGenre, IGenreFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { BehaviorSubject, Observable } from 'rxjs'

import { ErrorService } from '../error/error.service'

const queryGenres = gql<{ genres: { find: IGenreFindResult } }, EmptyObject>(`
  query {
    genres {
        find(page: 1, pageSize: 1000) {
          items { _id name }
        }
      }
    }
`)

@Injectable()
export class GenreService implements OnDestroy {
    private readonly _query = new BehaviorSubject<Record<string, IGenre>>({})

    get map(): Observable<Record<string, IGenre>> {
        return this._query
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._errors.serverCall(this._gql.query({ query: queryGenres }), (data) => {
            this._query?.next(
                data.genres.find.items.reduce((m, g) => ((m[g._id] = g), m), {} as Record<string, IGenre>)
            )
        })
    }

    ngOnDestroy(): void {
        this._query.complete()
    }
}
