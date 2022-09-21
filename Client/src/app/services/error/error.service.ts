import { Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { Observable } from 'rxjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

@Injectable()
export class ErrorService {
    serverCall<T>(obs: Observable<ApolloQueryResult<T>>, handler: (data: ApolloQueryResult<T>['data']) => void): void {
        const sub = obs.subscribe({
            error: (err) => $('body').toast({ class: 'error', displayTime: 0, message: err.message || 'failed' }),
            next: (response) => {
                try {
                    if (response.loading || response.error || response.partial) {
                        return
                    }

                    handler(response.data)
                } finally {
                    sub?.unsubscribe()
                }
            },
        })
    }
}
