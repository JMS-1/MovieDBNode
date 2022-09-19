import { Injectable, OnDestroy } from '@angular/core'
import { IRecordingQueryRequest, IRecordingQueryResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { BehaviorSubject, Observable } from 'rxjs'
import { v4 as uuid } from 'uuid'

import { ErrorService } from '../error/error.service'

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

const initialFilter: IRecordingQueryRequest = {
    correlationId: '',
    firstPage: 0,
    forExport: undefined,
    fullName: undefined,
    genres: undefined,
    language: undefined,
    pageSize: 2,
    rent: undefined,
    series: undefined,
    sort: 'fullName',
    sortOrder: 'Ascending',
}

@Injectable({ providedIn: 'root' })
export class RecordingService implements OnDestroy {
    private readonly _query = new BehaviorSubject<IRecordingQueryResult>({
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    })

    get result(): Observable<IRecordingQueryResult> {
        return this._query
    }

    private _filter = { ...initialFilter }

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

    get language(): string {
        return this._filter.language || ''
    }

    set language(language: string) {
        if (language === this._filter.language) {
            return
        }

        this._filter.language = language
        this.reload()
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this.reload()
    }

    private reload(): void {
        const correlationId = uuid()

        this._filter.correlationId = correlationId

        this._errors.serverCall(this._gql.query({ query: queryRecordings, variables: this._filter }), (data) => {
            const result = data.recordings.query

            if (result.correlationId !== this._filter.correlationId) {
                return
            }

            this._query?.next(result)
        })
    }

    ngOnDestroy(): void {
        this._query.complete()
    }
}
