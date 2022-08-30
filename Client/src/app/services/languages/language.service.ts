import { Injectable } from '@angular/core'
import { ILanguage, ILanguageFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { Observable } from 'rxjs'

import { ErrorService } from '../error/error.service'
import { createMulticastObservable, IMulticastObservable } from '../utils'

const queryLanguages = gql<{ languages: { find: ILanguageFindResult } }, EmptyObject>(`
  query {
      languages {
        find(page: 1, pageSize: 1000) {
          items { _id name }
        }
      }
    }
`)

@Injectable()
export class LanguageService {
    private _query?: IMulticastObservable<Record<string, ILanguage>>

    get map(): Record<string, ILanguage> {
        return this._query?.current() || {}
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._query = createMulticastObservable()

        this._errors.serverCall(this._gql.query({ query: queryLanguages }), (response) => {
            if (response.loading || response.error || response.partial) {
                return
            }

            this._query?.next(
                response.data.languages.find.items.reduce(
                    (m, l) => ((m[l._id] = l), m),
                    {} as Record<string, ILanguage>
                )
            )
        })
    }

    ngOnDestroy(): void {
        const query = this._query

        this._query = undefined

        query?.destroy()
    }
}
