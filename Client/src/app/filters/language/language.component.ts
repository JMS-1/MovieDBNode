import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { LanguageService } from 'src/app/services/languages/language.service'

@Component({
    selector: 'app-language-filter',
    styleUrls: ['./language.component.scss'],
    templateUrl: './language.component.html',
})
export class LanguageFilterComponent implements OnInit, OnDestroy {
    private _subscription?: Subscription

    languages: string[] = []

    constructor(private readonly _languages: LanguageService) {}

    ngOnInit(): void {
        this._subscription = this._languages.map?.subscribe((v) => {
            this.languages = Object.keys(v).map((id) => v[id].name)
        })
    }

    ngOnDestroy(): void {
        this._subscription?.unsubscribe()
    }
}
