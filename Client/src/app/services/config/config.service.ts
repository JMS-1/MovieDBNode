import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable()
export class ConfigService {
    public readonly server: string

    constructor() {
        this.server = environment.gqlServer || window.location.origin
    }
}
