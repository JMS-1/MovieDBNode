import { Injectable, OnDestroy } from '@angular/core'
import { ISeries, ISeriesFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { BehaviorSubject } from 'rxjs'

import { ErrorService } from '../error/error.service'

const querySeries = gql<{ series: { find: ISeriesFindResult } }, EmptyObject>(`
  query {
    series {
        find(page: 1, pageSize: 1000) {
          items { _id name description parentId fullName }
        }
      }
    }
`)

@Injectable()
export class SeriesService implements OnDestroy {
    private readonly _query = new BehaviorSubject<Record<string, ISeries>>({})

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._errors.serverCall(this._gql.query({ query: querySeries }), (data) => {
            this._query?.next(
                data.series.find.items.reduce((m, l) => ((m[l._id] = l), m), {} as Record<string, ISeries>)
            )
        })
    }

    ngOnDestroy(): void {
        this._query.complete()
    }
}
