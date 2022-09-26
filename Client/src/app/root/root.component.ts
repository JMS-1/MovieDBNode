import { Component, OnDestroy } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { IMenuItem } from '../semantic/menu/menu.component'
import { ThemeService, TThemes } from '../services/themes/theme.service'

@Component({
    selector: 'app-root',
    styleUrls: ['./root.component.scss'],
    templateUrl: './root.component.html',
})
export class RootComponent implements OnDestroy {
    private readonly _routeWatch: Subscription

    route = ''

    readonly newRoutes: IMenuItem[] = [
        { route: 'recording/NEW', text: 'Aufzeichnung erstellen' },
        { route: 'series/NEW', text: 'Serie erstellen' },
        { route: 'container/NEW', text: 'Ablage erstellen' },
        { route: 'languages/NEW', text: 'Sprache hinzufügen' },
        { route: 'genres/NEW', text: 'Kategorie hinzufügen' },
    ]

    readonly themeRoutes: IMenuItem[] = [
        { route: 'default', text: 'Standard' },
        { route: 'alternate.1', text: 'Alternative 1' },
        { route: 'alternate.2', text: 'Alternative 2' },
    ]

    constructor(private readonly _router: Router, private readonly _themes: ThemeService) {
        this._routeWatch = _router.events.subscribe((ev): void => {
            if (ev instanceof NavigationEnd) {
                this.route = ev.url
            }
        })

        this.syncThemeRoutes()
    }

    private syncThemeRoutes(): void {
        for (const item of this.themeRoutes) {
            item.active = item.route === this._themes.theme
        }
    }

    get isSeries(): boolean {
        return this.route.startsWith('/series')
    }

    get isGenre(): boolean {
        return this.route.startsWith('/genres')
    }

    get isLanguage(): boolean {
        return this.route.startsWith('/languages')
    }

    get isContainer(): boolean {
        return this.route.startsWith('/container')
    }

    get isRecording(): boolean {
        return this.route === '/' || this.route.startsWith('/recording')
    }

    onNew(route: string): void {
        this._router.navigateByUrl(route)
    }

    onTheme(theme: string): void {
        this._themes.theme = theme as TThemes

        this.syncThemeRoutes()
    }

    ngOnDestroy(): void {
        this._routeWatch.unsubscribe()
    }
}
