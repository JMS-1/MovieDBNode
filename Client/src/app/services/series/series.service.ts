import { Injectable } from '@angular/core'
import { ISeries, ISeriesFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'

import { ErrorService } from '../error/error.service'
import { createMulticastObservable, IMulticastObservable } from '../utils'

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
export class SeriesService {
    private _query?: IMulticastObservable<Record<string, ISeries>>

    get map(): Record<string, ISeries> {
        return {}
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._query = createMulticastObservable({})

        this._errors.serverCall(this._gql.query({ query: querySeries }), (response) => {
            if (response.loading || response.error || response.partial) {
                return
            }

            this._query?.next(
                response.data.series.find.items.reduce((m, l) => ((m[l._id] = l), m), {} as Record<string, ISeries>)
            )
        })
    }

    ngOnDestroy(): void {
        const query = this._query

        this._query = undefined

        query?.destroy()
    }
}
