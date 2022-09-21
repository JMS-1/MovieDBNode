import { Component } from '@angular/core'

import { RecordingService } from '../../services/recordings/recording.service'

@Component({
    selector: 'app-text-filter',
    styleUrls: ['./text.component.scss'],
    templateUrl: './text.component.html',
})
export class TextFilterComponent {
    constructor(private readonly _recordings: RecordingService) {}

    get filter(): string {
        return this._recordings.fullName
    }

    set filter(filter: string) {
        this._recordings.fullName = filter
    }
}
