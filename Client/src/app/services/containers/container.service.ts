import { Injectable } from '@angular/core'
import { IContainer, IContainerFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'

import { ErrorService } from '../error/error.service'
import { createMulticastObservable, IMulticastObservable } from '../utils'

const queryContainers = gql<{ containers: { find: IContainerFindResult } }, EmptyObject>(`
  query {
    containers {
        find(page: 1, pageSize: 1000) {
          items { _id name description parentId parentLocation type }
        }
      }
    }
`)

@Injectable()
export class ContainerService {
    private _query?: IMulticastObservable<Record<string, IContainer>>

    get map(): Record<string, IContainer> {
        return this._query?.current() || {}
    }

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._query = createMulticastObservable()

        this._errors.serverCall(this._gql.query({ query: queryContainers }), (response) => {
            if (response.loading || response.error || response.partial) {
                return
            }

            this._query?.next(
                response.data.containers.find.items.reduce(
                    (m, l) => ((m[l._id] = l), m),
                    {} as Record<string, IContainer>
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
