import { Injectable, OnDestroy } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { BehaviorSubject, Observable } from 'rxjs'

import { ISeries, ISeriesFindResult } from '../../../api'
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

export interface ISeriesNode extends ISeries {
    allChildren: string[]
    children: ISeriesNode[]
    parent?: ISeriesNode
}

function fillChildren(series: ISeriesNode): void {
    for (const child of series.children) {
        series.allChildren.push(child._id)

        fillChildren(child)

        series.allChildren.push(...child.allChildren)
    }
}

@Injectable()
export class SeriesService implements OnDestroy {
    private readonly _query = new BehaviorSubject<Record<string, ISeriesNode>>({})

    private readonly _roots = new BehaviorSubject<ISeriesNode[]>([])

    get map(): Observable<Record<string, ISeriesNode>> {
        return this._query
    }

    get roots(): Observable<ISeriesNode[]> {
        return this._roots
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._errors.serverCall(this._gql.query({ query: querySeries }), (data) => {
            const map = data.series.find.items.reduce((map, series) => {
                if (!series.name) {
                    series.name = series._id
                }

                if (!series.fullName) {
                    series.fullName = series.name
                }

                map[series._id] = { ...series, allChildren: [], children: [], parent: undefined }

                return map
            }, {} as Record<string, ISeriesNode>)

            const roots: ISeriesNode[] = []

            for (const id of Object.keys(map)) {
                const series = map[id]

                series.parent = series.parentId ? map[series.parentId] : undefined

                if (series.parent) {
                    series.parent.children.push(series)
                } else {
                    roots.push(series)
                }
            }

            roots.forEach(fillChildren)

            this._query.next(map)
            this._roots.next(roots)
        })
    }

    ngOnDestroy(): void {
        this._query.complete()
        this._roots.complete()
    }
}
