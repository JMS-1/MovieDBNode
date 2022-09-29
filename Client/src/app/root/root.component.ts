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
        { route: '/recordings/NEW', text: $localize`:@@menu.new.recording:Aufzeichnung erstellen` },
        { route: '/series/NEW', text: $localize`:@@menu.new.series:Serie erstellen` },
        { route: '/containers/NEW', text: $localize`:@@menu.new.container:Ablage erstellen` },
        { route: '/languages/NEW', text: $localize`:@@menu.new.language:Sprache hinzufügen` },
        { route: '/genres/NEW', text: $localize`:@@menu.new.genre:Kategorie hinzufügen` },
    ]

    readonly themeRoutes: IMenuItem[] = [
        { route: 'default', text: $localize`:@@menu.themes.default:Standard` },
        { route: 'alternate.1', text: $localize`:@@menu.themes.alt1:Alternative 1` },
        { route: 'alternate.2', text: $localize`:@@menu.themes.alt2:Alternative 2` },
    ]

    readonly languageRoutes: IMenuItem[] = [
        { route: '/de', text: 'Deutsch' },
        { route: '/en', text: 'English' },
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
        return this.route.startsWith('/containers')
    }

    get isRecording(): boolean {
        return this.route === '/' || this.route.startsWith('/recordings')
    }

    onNew(route: string): void {
        this._router.navigateByUrl(route)
    }

    onLanguage(route: string): void {
        window.location.href = route
    }

    onTheme(theme: string): void {
        this._themes.theme = theme as TThemes

        this.syncThemeRoutes()
    }

    ngOnDestroy(): void {
        this._routeWatch.unsubscribe()
    }
}
