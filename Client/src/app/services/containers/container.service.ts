import { Injectable, OnDestroy } from '@angular/core'
import { IContainer, IContainerFindResult } from 'api'
import { Apollo, gql } from 'apollo-angular'
import { EmptyObject } from 'apollo-angular/types'
import { BehaviorSubject } from 'rxjs'

import { ErrorService } from '../error/error.service'

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
export class ContainerService implements OnDestroy {
    private readonly _query = new BehaviorSubject({})

    constructor(private readonly _gql: Apollo, private readonly _errors: ErrorService) {
        this._errors.serverCall(this._gql.query({ query: queryContainers }), (data) => {
            this._query?.next(
                data.containers.find.items.reduce((m, l) => ((m[l._id] = l), m), {} as Record<string, IContainer>)
            )
        })
    }

    ngOnDestroy(): void {
        this._query.complete()
    }
}
