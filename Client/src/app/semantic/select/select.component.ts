/* eslint-disable @typescript-eslint/naming-convention */

import * as angular from '@angular/core'
import { map, Observable } from 'rxjs'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let $: any

export interface ISelectItem {
    key: string
    text: string
}

@angular.Component({
    selector: 'semantic-single-select',
    styleUrls: ['./select.component.scss'],
    templateUrl: './select.component.html',
})
export class SelectComponent implements angular.AfterViewInit {
    @angular.ViewChild('singleSelect') dropdown?: angular.ElementRef<HTMLDivElement>

    @angular.Input() selected = ''

    @angular.Input() items: ISelectItem[] = []

    @angular.Output() select = new angular.EventEmitter<string>()

    ngAfterViewInit(): void {
        const elem = $(this.dropdown?.nativeElement)

        elem.dropdown({
            onChange: (selected: string) => this.select.emit(selected),
        })

        setTimeout(() => elem.dropdown('set exactly', this.selected), 100)
    }
}

interface ISortable {
    _id: string
    name: string
}

export function createSorted<T extends ISortable>(obs: Observable<Record<string, T>>): Observable<ISelectItem[]> {
    return obs.pipe(
        map((m) =>
            Object.keys(m)
                .map((id) => ({ key: id, text: m[id].name || id }))
                .sort((l, r) => l.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase()))
        )
    )
}
