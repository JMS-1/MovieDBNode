import { Injectable } from '@angular/core'

@Injectable()
export class ConfigService {
    public readonly server: string

    constructor() {
        const { search, origin } = window.location

        this.server = search.startsWith('?gql=') ? decodeURIComponent(search.substring(5)) : origin
    }
}
