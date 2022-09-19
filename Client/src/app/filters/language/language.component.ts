import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { LanguageService } from 'src/app/services/languages/language.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

@Component({
    selector: 'app-language-filter',
    styleUrls: ['./language.component.scss'],
    templateUrl: './language.component.html',
})
export class LanguageFilterComponent implements OnDestroy, AfterViewInit {
    private readonly _subscription: Subscription

    languages: string[] = []

    @ViewChild('filter') dropdown?: ElementRef<HTMLDivElement>

    constructor(private readonly _languages: LanguageService) {
        this._subscription = this._languages.map.subscribe((v) => {
            this.languages = Object.keys(v).map((id) => v[id].name)
        })
    }

    ngAfterViewInit(): void {
        $(this.dropdown?.nativeElement).dropdown()
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe()
    }
}
