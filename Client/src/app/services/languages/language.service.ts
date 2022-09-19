import { Injectable, OnDestroy } from '@angular/core'
import { ILanguage, ILanguageFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { BehaviorSubject, Observable } from 'rxjs'

import { ErrorService } from '../error/error.service'

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
export class LanguageService implements OnDestroy {
    private readonly _query = new BehaviorSubject<Record<string, ILanguage>>({})

    get map(): Observable<Record<string, ILanguage>> {
        return this._query
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._errors.serverCall(this._gql.query({ query: queryLanguages }), (data) => {
            this._query?.next(
                data.languages.find.items.reduce((m, l) => ((m[l._id] = l), m), {} as Record<string, ILanguage>)
            )
        })
    }

    ngOnDestroy(): void {
        this._query.complete()
    }
}
