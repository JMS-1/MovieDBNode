import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { createSorted, ISelectItem } from 'src/app/semantic/select/select.component'
import { LanguageService } from 'src/app/services/languages/language.service'
import { RecordingService } from 'src/app/services/recordings/recording.service'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

@Component({
    selector: 'app-language-filter',
    styleUrls: ['./language.component.scss'],
    templateUrl: './language.component.html',
})
export class LanguageFilterComponent implements OnDestroy {
    private readonly _subscription: Subscription

    orderedAsItems: ISelectItem[] = []

    constructor(private readonly _languages: LanguageService, private readonly _recordings: RecordingService) {
        this._subscription = createSorted(this._languages.map).subscribe((l) => (this.orderedAsItems = l))
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe()
    }

    get selected(): string {
        return this._recordings.language
    }

    set selected(selected: string) {
        this._recordings.language = selected
    }
}
