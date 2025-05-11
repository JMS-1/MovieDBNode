import { Component } from '@angular/core'

import { RecordingsService } from '../../services/recordings/recordings.service'

@Component({
    selector: 'app-text-filter',
    styleUrls: ['./text.component.scss'],
    templateUrl: './text.component.html',
    standalone: false
})
export class TextFilterComponent {
    constructor(private readonly _recordings: RecordingsService) {}

    get filter(): string {
        return this._recordings.fullName
    }

    set filter(filter: string) {
        this._recordings.fullName = filter
    }
}
