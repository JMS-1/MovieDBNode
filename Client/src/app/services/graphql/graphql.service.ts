import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ValidationError } from 'fastest-validator'

import { ConfigService } from '../config/config.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

function createToast(message: string): void {
    $('body').toast({ class: 'error', displayTime: 0, message })
}

/* eslint-disable @typescript-eslint/naming-convention */
const httpOptions = {
    headers: { 'Content-Type': 'application/json' },
}
/* eslint-enable @typescript-eslint/naming-convention */

@Injectable()
export class GraphQLService {
    readonly endpoint: string

    constructor(private readonly http: HttpClient, config: ConfigService) {
        this.endpoint = `${config.server}/graphql`
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call<T = any>(query: string, variables: unknown, handler: (data: T) => void): void {
        const sub = this.http
            .post<{ data: T; errors: ValidationError[] }>(this.endpoint, { query, variables }, httpOptions)
            .subscribe({
                error: (err) => createToast(err.message || 'failed'),
                next: (res) => {
                    try {
                        const err = (res.errors || []).map((e) => e.message).join('\n')

                        if (err) {
                            createToast(err)
                        } else {
                            handler(res.data)
                        }
                    } finally {
                        sub?.unsubscribe()
                    }
                },
            })
    }
}
