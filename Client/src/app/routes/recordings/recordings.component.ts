import { Component, OnInit } from '@angular/core'
import { IRecordingQueryResult } from 'api'
import { Subscription } from 'rxjs'

import { RecordingService } from '../../services/recordings/recording.service'

@Component({
    selector: 'app-recordings',
    styleUrls: ['./recordings.component.scss'],
    templateUrl: './recordings.component.html',
})
export class RecordingsRouteComponent implements OnInit {
    private _recordings?: Subscription

    recordings: IRecordingQueryResult = {
        correlationId: '',
        count: 0,
        genres: [],
        languages: [],
        total: 0,
        view: [],
    }

    constructor(private readonly _recordingService: RecordingService) {}

    ngOnInit(): void {
        this._recordings = this._recordingService.result.subscribe((result) => (this.recordings = result))
    }

    ngOnDestroy(): void {
        this._recordings?.unsubscribe()
    }

    clear(): void {
        this._recordingService.reset()
    }
}
