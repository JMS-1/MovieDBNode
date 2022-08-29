import { Injectable } from '@angular/core'
import { IRecordingQueryRequest, IRecordingQueryResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { Observable, Observer } from 'rxjs'
import { v4 as uuid } from 'uuid'

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
export class RecordingsService {
    private readonly _observers: Observer<IRecordingQueryResult>[] = []

    private _lastResult?: IRecordingQueryResult

    private _filter: IRecordingQueryRequest = {
        correlationId: '',
        firstPage: 0,
        forExport: undefined,
        fullName: undefined,
        genres: undefined,
        language: undefined,
        pageSize: 50,
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

    public readonly query: Observable<IRecordingQueryResult>

    constructor(private readonly _gql: Apollo) {
        this.query = new Observable<IRecordingQueryResult>((observer) => {
            this._observers.push(observer)

            if (this._lastResult) {
                observer.next(this._lastResult)
            }

            return {
                unsubscribe: () => {
                    const index = this._observers.findIndex((o) => o === observer)

                    if (index >= 0) {
                        this._observers.splice(index, 1)
                    }
                },
            }
        })

        this.reload()
    }

    reload(): void {
        const correlationId = uuid()

        this._filter.correlationId = correlationId

        const query = this._gql.query({ query: queryRecordings, variables: this._filter }).subscribe((response) => {
            try {
                if (response.loading || response.error || response.partial) {
                    return
                }

                const result = response.data.recordings.query

                if (result.correlationId !== this._filter.correlationId) {
                    return
                }

                this._lastResult = result

                for (const observer of this._observers.slice(0)) {
                    observer.next(result)
                }
            } finally {
                query?.unsubscribe()
            }
        })
    }
}
