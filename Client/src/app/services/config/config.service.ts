import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable()
export class ConfigService {
    public static gqlServer = ''

    public readonly server: string

    constructor(router: Router) {
        this.server = ConfigService.gqlServer
    }
}
