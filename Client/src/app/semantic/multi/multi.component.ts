import { AfterViewInit, Component, OnChanges } from '@angular/core'
import * as angular from '@angular/core'

import { ISelectItem } from '../../utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

@Component({
    selector: 'semantic-multi-select',
    styleUrls: ['./multi.component.scss'],
    templateUrl: './multi.component.html',
})
export class MultiSelectComponent implements OnChanges, AfterViewInit {
    @angular.ViewChild('multiSelect') dropdown?: angular.ElementRef<HTMLDivElement>

    @angular.Input() hint = '(bitte auswählen)'

    @angular.Input() selected = [] as string[]

    @angular.Output() selectedChange = new angular.EventEmitter<string[]>()

    @angular.Input() items: ISelectItem[] = []

    private _events = true

    private setSelected(selected: string[]): void {
        this._events = false

        try {
            $(this.dropdown?.nativeElement)?.dropdown('set exactly', selected || [])
        } finally {
            this._events = true
        }
    }

    ngAfterViewInit(): void {
        const elem = $(this.dropdown?.nativeElement)

        elem.dropdown({
            forceSelection: false,
            onChange: (s: string) =>
                this._events &&
                this.selectedChange.emit(
                    (s || '')
                        .split(',')
                        .map((s) => s.trim())
                        .filter((s) => s)
                ),
        })

        setTimeout(() => {
            this.setSelected(this.selected)

            elem.css('visibility', '')
        }, 100)
    }

    ngOnChanges(changes: angular.SimpleChanges): void {
        const selected = changes['selected']

        if (selected) {
            this.setSelected(selected.firstChange ? selected.previousValue : selected.currentValue)
        }
    }
}
