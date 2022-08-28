import { Injectable } from '@angular/core'
import { IRecordingQueryResult } from 'api'
import { Apollo, gql } from 'apollo-angular'

@Injectable({ providedIn: 'root' })
export class RecordingsService {
    constructor(private readonly _gql: Apollo) {}

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    query(correlationId: string) {
        const query = gql`
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
                        }
                    }
                }
            }
        `

        return this._gql.query<{ recordings: { query: IRecordingQueryResult } }>({
            query,
            variables: {
                correlationId,
                firstPage: 0,
                pageSize: 50,
                sort: 'fullName',
                sortOrder: 'Ascending',
            },
        })
    }
}
