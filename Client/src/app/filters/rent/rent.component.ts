import { Component } from '@angular/core'

import { RecordingsService } from '../../services/recordings/recordings.service'
import { ISelectItem } from '../../utils'

@Component({
    selector: 'app-rent-filter',
    styleUrls: ['./rent.component.scss'],
    templateUrl: './rent.component.html',
})
export class RentFilterComponent {
    orderedAsItems: ISelectItem[] = [
        { key: '1', text: $localize`:@@filter.rent.yes:verliehen` },
        { key: '0', text: $localize`:@@filter.rent.no:nicht verliehen` },
    ]

    constructor(private readonly _recordings: RecordingsService) {}

    get selected(): string {
        return typeof this._recordings.rent === 'boolean' ? (this._recordings.rent ? '1' : '0') : ''
    }

    set selected(selected: string) {
        this._recordings.rent = selected === '' ? undefined : selected === '1'
    }
}
