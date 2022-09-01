import { Injectable } from '@angular/core'
import { IGenre, IGenreFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'

import { ErrorService } from '../error/error.service'
import { createMulticastObservable, IMulticastObservable } from '../utils'

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
export class GenreService {
    private _query?: IMulticastObservable<Record<string, IGenre>>

    get map(): Record<string, IGenre> {
        return this._query?.current() || {}
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._query = createMulticastObservable()

        this._errors.serverCall(this._gql.query({ query: queryGenres }), (response) => {
            if (response.loading || response.error || response.partial) {
                return
            }

            this._query?.next(
                response.data.genres.find.items.reduce((m, l) => ((m[l._id] = l), m), {} as Record<string, IGenre>)
            )
        })
    }

    ngOnDestroy(): void {
        const query = this._query

        this._query = undefined

        query?.destroy()
    }
}
