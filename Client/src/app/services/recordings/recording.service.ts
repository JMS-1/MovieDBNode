import { Injectable, OnDestroy } from '@angular/core'
import { IRecordingQueryRequest, IRecordingQueryResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { Observable, Observer } from 'rxjs'
import { v4 as uuid } from 'uuid'

import { ErrorService } from '../error/error.service'
import { createMulticastObservable, IMulticastObservable } from '../utils'

const queryRecordings = gql<{ recordings: { query: IRecordingQueryResult } }, IRecordingQueryRequest>(`
  query (
      $correlationId: ID
      $firstPage: Int!
      $forExport: Boolean
      $fullName: String
      $genres: [String!]
      $language: String
      $pageSize: Int!
      $rent: Boolean
      $series: [String!]
      $sort: RecordingSort!
      $sortOrder: SortDirection!
  ) {
      recordings {
          query(
              correlationId: $correlationId
              firstPage: $firstPage
              forExport: $forExport
              fullName: $fullName
              genres: $genres
              language: $language
              pageSize: $pageSize
              rent: $rent
              series: $series
              sort: $sort
              sortOrder: $sortOrder
          ) {
              correlationId
              count
              total
              genres {
                  _id
                  count
              }
              languages {
                  _id
                  count
              }
              view {
                  _id
                  name
                  rentTo
                  series
                  containerId
                  containerPosition
                  containerType
                  created
                  description
                  fullName
                  genres
                  languages
                  links {
                      description
                      name
                      url
                  }
              }
          }
      }
  }
`)

@Injectable({ providedIn: 'root' })
export class RecordingService implements OnDestroy {
    private _filter: IRecordingQueryRequest = {
        correlationId: '',
        firstPage: 0,
        forExport: undefined,
        fullName: undefined,
        genres: undefined,
        language: undefined,
        pageSize: 10,
        rent: undefined,
        series: undefined,
        sort: 'fullName',
        sortOrder: 'Ascending',
    }

    get pageSize(): number {
        return this._filter.pageSize
    }

    set pageSize(pageSize: number) {
        if (pageSize < 1 || !Number.isSafeInteger(pageSize) || pageSize === this._filter.pageSize) {
            return
        }

        this._filter.pageSize = pageSize
        this.reload()
    }

    private _query?: IMulticastObservable<IRecordingQueryResult>

    get query(): Observable<IRecordingQueryResult> | undefined {
        return this._query
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._query = createMulticastObservable()

        this.reload()
    }

    reload(): void {
        const correlationId = uuid()

        this._filter.correlationId = correlationId

        this._errors.serverCall(this._gql.query({ query: queryRecordings, variables: this._filter }), (response) => {
            if (response.loading || response.error || response.partial) {
                return
            }

            const result = response.data.recordings.query

            if (result.correlationId !== this._filter.correlationId) {
                return
            }

            this._query?.next(result)
        })
    }

    ngOnDestroy(): void {
        const query = this._query

        this._query = undefined

        query?.destroy()
    }
}
