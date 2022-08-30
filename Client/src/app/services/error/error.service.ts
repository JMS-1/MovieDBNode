import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class ErrorService {
    serverCall<T>(obs: Observable<T>, handler: (data: T) => void): void {
        const sub = obs.subscribe({
            error: (err) => alert(err.message),
            next: (response) => {
                try {
                    handler(response)
                } finally {
                    sub?.unsubscribe()
                }
            },
        })
    }
}
