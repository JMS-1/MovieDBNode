import { Component, OnDestroy } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { ThemeService } from '../services/themes/theme.service'

@Component({
    selector: 'app-root',
    styleUrls: ['./root.component.scss'],
    templateUrl: './root.component.html',
})
export class RootComponent implements OnDestroy {
    private readonly _routeWatch: Subscription

    route = ''

    constructor(router: Router, readonly _themes: ThemeService) {
        this._routeWatch = router.events.subscribe((ev): void => {
            if (ev instanceof NavigationEnd) {
                this.route = ev.url
            }
        })
    }

    get isSeries(): boolean {
        return this.route.startsWith('/series')
    }

    get isGenre(): boolean {
        return this.route.startsWith('/genre')
    }

    get isLanguage(): boolean {
        return this.route.startsWith('/language')
    }

    get isContainer(): boolean {
        return this.route.startsWith('/container')
    }

    get isRecording(): boolean {
        return this.route === '/' || this.route.startsWith('/recording')
    }

    ngOnDestroy(): void {
        this._routeWatch.unsubscribe()
    }
}
