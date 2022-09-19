import { Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { Observable } from 'rxjs'

@Injectable()
export class ErrorService {
    serverCall<T>(obs: Observable<ApolloQueryResult<T>>, handler: (data: ApolloQueryResult<T>['data']) => void): void {
        const sub = obs.subscribe({
            error: (err) => alert(err.message),
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
