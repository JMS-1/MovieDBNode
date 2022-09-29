import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

@Component({
    selector: 'semantic-search',
    styleUrls: ['./search.component.scss'],
    templateUrl: './search.component.html',
})
export class SearchComponent {
    @ViewChild('search') search?: ElementRef<HTMLDivElement>

    @Input() hint = $localize`:@@search.hint:Suche...`

    @Input() text = ''

    @Input() clearable = false

    @Output() textChange = new EventEmitter<string>()

    onChange(text: string): void {
        this.textChange.emit(text)
    }

    clear(): void {
        if (this.clearable) {
            this.onChange('')
        }
    }
}
