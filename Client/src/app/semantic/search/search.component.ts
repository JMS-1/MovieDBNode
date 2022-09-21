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

    @Input() hint = 'Suche...'

    @Input() text = ''

    @Output() textChange = new EventEmitter<string>()

    onChange(text: string): void {
        this.textChange.emit(text)
    }
}
