/* eslint-disable @typescript-eslint/naming-convention */

import * as angular from '@angular/core'

import { ISelectItem } from '../../utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

@angular.Component({
    selector: 'semantic-single-select',
    styleUrls: ['./select.component.scss'],
    templateUrl: './select.component.html',
})
export class SelectComponent implements angular.AfterViewInit, angular.OnChanges {
    @angular.ViewChild('singleSelect') dropdown?: angular.ElementRef<HTMLDivElement>

    @angular.Input() hint = '(bitte auswählen)'

    @angular.Input() selected = ''

    @angular.Output() selectedChange = new angular.EventEmitter<string>()

    @angular.Input() items: ISelectItem[] = []

    private _events = true

    private setSelected(selected: string): void {
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
            onChange: (s: string) => this._events && this.selectedChange.emit(s),
        })

        elem.dropdown('destroy')

        setTimeout(() => {
            this.setSelected(this.selected)

            elem.css('visibility', '')
        }, 100000)
    }

    ngOnChanges(changes: angular.SimpleChanges): void {
        const selected = changes['selected']

        if (selected) {
            this.setSelected(selected.firstChange ? selected.previousValue : selected.currentValue)
        }
    }
}
