import { Injectable, OnInit } from '@angular/core'
import { v4 as uuid } from 'uuid'

export type TThemes = 'default' | 'alternate.1' | 'alternate.2'

@Injectable()
export class ThemeService {
    private readonly _themeId = uuid()

    private _theme: TThemes = 'default'

    constructor() {
        this.theme = 'default'
    }

    get theme(): TThemes {
        return this._theme
    }

    set theme(theme: TThemes) {
        this._theme = theme

        let link = document.getElementById(this._themeId) as HTMLLinkElement

        if (!link) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            link = document.querySelector('head')!.appendChild(document.createElement('link'))

            link.id = this._themeId
            link.rel = 'stylesheet'
        }

        link.href = `assets/${theme}/semantic.min.css`
    }
}
